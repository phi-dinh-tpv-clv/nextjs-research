import * as React from "react";
import { useDebounce } from "use-debounce";
import { Command, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { optionDataType } from "../controlled/ControlledSelect";
import { useGQLQuery } from "@/utils/hooks/useGQLQuery";
import { QUERY_ALL_USERS } from "@/utils/common/constants";
import { GET_ALL_USERS } from "@/graphql/queries/getAllUsers";
import { UserDataType } from "@/types/user.types";
``;

interface SearchProps {
  selectedResult?: UserDataType;
  onSelectResult: (user: UserDataType) => void;
  CustomOptionsItem?: React.ComponentType<any>;
}

export function ComboSearchResults({ selectedResult, onSelectResult, CustomOptionsItem }: SearchProps) {
  const [searchQuery, setSearchQuery] = React.useState("");

  const handleSelectResult = (user: UserDataType) => {
    onSelectResult(user);

    // OPTIONAL: reset the search query upon selection
    // setSearchQuery('');
  };

  return (
    <Command shouldFilter={false} className="h-auto w-full rounded-lg border border-b-0 shadow-md">
      <CommandInput
        className="min-w-full"
        value={searchQuery}
        onValueChange={setSearchQuery}
        placeholder="Search for users"
        data-cy="combo-search"
      />

      <SearchResults
        query={searchQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
        CustomOptionsItem={CustomOptionsItem}
      />
    </Command>
  );
}

interface SearchResultsProps {
  query: string;
  selectedResult: SearchProps["selectedResult"];
  onSelectResult: SearchProps["onSelectResult"];
  CustomOptionsItem?: React.ComponentType<any>;
}

function SearchResults({ query, selectedResult, onSelectResult, CustomOptionsItem }: SearchResultsProps) {
  const [debouncedSearchQuery] = useDebounce(query, 500);

  const enabled = !!debouncedSearchQuery;

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useGQLQuery([...QUERY_ALL_USERS, query], GET_ALL_USERS, {
    keyword: query,
  });

  // To get around this https://github.com/TanStack/query/issues/3584
  const isLoading = enabled && isLoadingOrig;

  if (!enabled) return null;

  return (
    <CommandList data-cy="search-results">
      {/* TODO: these should have proper loading aria */}
      {isLoading && <div className="p-4 text-sm">Searching...</div>}
      {!isError && !isLoading && !(data as any)?.getAllUsers?.length && (
        <div className="p-4 text-sm">No user found</div>
      )}
      {isError && <div className="p-4 text-sm">Something went wrong</div>}

      {(data as any)?.getAllUsers?.map(({ id, fullname, avatar, email }: UserDataType) => {
        return (
          <CommandItem
            className="w-full max-w-full"
            key={id}
            onSelect={() => onSelectResult({ id, fullname })}
            value={id}
            data-cy="combobox-item"
          >
            <Check className={cn("mr-2 h-4 w-4", selectedResult?.id === id ? "opacity-100" : "opacity-0")} />
            {/* {fullname} */}
            {CustomOptionsItem ? (
              <CustomOptionsItem avtUrl={avatar} fullname={fullname} email={email} key={id} />
            ) : (
              `${fullname}`
            )}
          </CommandItem>
        );
      })}
    </CommandList>
  );
}
