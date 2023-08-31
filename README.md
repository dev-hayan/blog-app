# Blog App

This README provides an overview of the features and functionalities of the Blog App. The app is designed to facilitate various user actions such as registration, authentication, creating posts, commenting, and more. It also includes role-based access control and administrative capabilities.

## Table of Contents

- [Authentication](#authentication)
- [User Roles](#user-roles)
- [Dashboard Page](#dashboard-page)
- [Posts Page](#posts-page)
- [Comments](#comments)
- [Suggestions](#suggestions)
- [Moderators](#for-moderators)
- [Admin Section](#admin-section)

## Authentication

The authentication system ensures a secure user experience with the following features:

- User registration and email confirmation.
- Secure login process.
- Ability to modify user profile information.
- Account security: After 5 incorrect login attempts, user login is disabled for 5 minutes.
- Email change process: Users are required to re-confirm their new email addresses.

## User Roles

The app includes the following user roles:

- **Admin**: Has full control over the app, with the ability to manage users, posts, comments, likes, reports, and suggestions.
- **Moderators**: Responsible for reviewing and approving user-submitted posts, as well as managing reported posts.
- **Users**: Can create, manage, and interact with posts, comments, and suggestions.

## Dashboard Page

The dashboard page provides a quick overview of recent activities:

- Most recent posts.
- Most recent comments.
- Most recent likes.

## Posts Page

The posts page allows users to:

- List all posts available.
- View individual posts in detail.
- Create new posts with styled text content using an editor.
- Attach inline files to posts (stored on cloud services like Amazon S3).
- Interact with posts through likes, comments, and reporting.

## Comments

Comments provide an interactive element to posts:

- Comments can have attachments.
- Users can like and reply to comments.
- Comments can be reported for inappropriate content.

## Suggestions

The suggestions feature enhances user collaboration:

- Users can view suggestions made by others.
- Suggestions can be modified and incorporated into a user's blog post.
- Rejection and response options available for suggestions.
- Users can view suggestions they've submitted on others' posts.

## For Moderators

Moderators have additional responsibilities:

- Review and approve posts submitted by users.
- Manage reported posts by deleting or un-publishing them.

## Admin Section

- Admins have the ability to manage users, posts, comments, likes, reports, and suggestions through an intuitive interface.

---

This concludes the overview of the Blog App and its features. For more detailed information, refer to the relevant sections above. Feel free to contribute and make the app even better!
