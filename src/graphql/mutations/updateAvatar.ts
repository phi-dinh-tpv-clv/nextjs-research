import { gql } from "graphql-tag";

export const UPDATE_AVATAR = gql`
  mutation UploadAvatar($avatar: Upload!, $userId: String!) {
    uploadAvatar(avatar: $avatar, userId: $userId) {
      id
      fullname
      avatar
    }
  }
`;

export const uploadAvatarFormData = (payload: { userId: number; avatar: File }) => {
  let formData = new FormData();
  formData.append(
    "operations",
    `{"query": "mutation UploadAvatar($avatar: Upload!, $userId: String!) { uploadAvatar(avatar: $avatar, userId: $userId) { id fullname avatar }}", "variables": { "avatar": null, "userId": "${payload.userId}" }}`,
  );
  formData.append("map", '{ "0": ["variables.avatar"] }');
  formData.append("0", payload.avatar);

  return formData;
};
