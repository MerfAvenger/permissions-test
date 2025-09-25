# Permissions Test App

This app was put together to demonstrate the different behaviours between the browser permissions APIs.

In particular, Firefox's behaviour for temporary permissions grants differs from Chrome in a way I consider inconsistent and unexpected.

## Chrome Behaviour

- Initial permissions state is PROMPT.
- When the button is clicked, permissions are requested and temporarily granted for a camera, the permissions state becomes GRANTED.
- When the page is closed and opened in a new tab, the permissions state returns to PROMPT.
- When the button is clicked, permissions are requested and temporarily granted for a camera, the permissions state becomes GRANTED.

**This reflects what I would expect, since the user is prompted again in a new tab!**

## Firefox Behaviour

- Initial permissions state is PROMPT.
- When the button is clicked, permissions are requested and temporarily granted for a camera, the permissions state becomes GRANTED.
- When the page is closed and opened in a new tab, the permissions state _still reports GRANTED_.
- When the button is clicked, permissions are requested and temporarily granted for a camera, the permissions state becomes GRANTED.

**The user is prompted for permissions, so I would expect the permissions API to reflect this!**
