# YourDash Login Flow (WEB)

1. User navigates to /login
2. if no instance is found or the instance is invalid, redirect to /instance
3. The user inputs a valid instance URL, redirect to /login
4. Test the instance exists and is up-to-date with the client
5. fetch the instance's background, name and description
6. The user enters their username, load the avatar and display name. If the account is locked, show a warning message with the option to go back or contact the instance's administrators which will
   show the instance administrator's configured information (this is not tied to the admin's account and is configured in the administrator settings for the instance)
7. The user enters a password
8. The user can then press the Login button
9. If the password is correct, redirect to /login/success
10. /app will then redirect to the user's home application (uk-ewsgit-dash by default)
