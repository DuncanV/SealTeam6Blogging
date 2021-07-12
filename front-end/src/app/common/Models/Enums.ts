export enum ERole {
  user = "user",
  admin = "admin",
  visitor = "visitor"
}

export enum EPermission {
  landingView = "Can View Landing Page"
}

export enum ESnackBarType {
  success = "success",
  error = "error",
  notification = "notification",
}

export enum ELoginMessages {
  loginSuccess = "User successfully logged in.",
  loginFailure = "User could not log in. Please try again."
}

export enum ESignUpMessages {
  signUpSuccess = "User successfully created.",
  signUpFailure = "User could not be created. Please try again."
}

export enum ELogOutMessages {
  logOutSuccess = "User logged out successfully.",
  logOutFailure = "User could not be logged out. Please contact Admin."
}

export enum EUpdateProfileMessages {
  updateProfileSuccess = "User profile updated.",
  updateProfileFailure = "User profile could not be updated."
}

export enum EUpdateBlogMessages {
  updateBlogSuccess = "Blog successfully updated.",
  updateBlogFailure = "Blog could not be updated."
}

export enum ECreateBlogMessages {
  createBlogSuccess = "Blog successfully created.",
  createBlogFailure = "Blog could not be created."
}

export enum EDeleteBlogMessages {
  deleteBlogSuccess = "Blog successfully deleted.",
  deleteBlogFailure = "Blog could not be deleted."
}

export enum EPasswordsMessages {
  passwordDoNotMatch = "The passwords do not match. Try again.",
  invalidPassword = "Invalid password. Please enter a valid password."
}


