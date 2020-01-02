export const LoginMapper = {
  dehydrate(data) {
    const getFormData = object => Object.keys(object).reduce((formData, key) => {
      formData.append(key, object[key]);
      return formData;
    }, new FormData());
    return getFormData(data);
  },
  hydrate(data) {
    return {
      token: `${data.token_type} ${data.access_token}`,
      expires: data.expires_in,
      refresh_token: data.refresh_token
    };
  }
};
