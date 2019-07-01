# Spotify Search App

 Spotify Search App  is a simple react based app that allows users to Search Songs by Track , Album and Artist 
 
 #### Technologies used 
 - React (using create-react-app as a base) with hooks
 - Axios (for ajax requests)
 - React-Bootstrap  ( to support Desktop , Tablet and Mobile views  )
 - CSS used for styling 
 
#### Spotify Api 

App created based on Spotify web API - https://developer.spotify.com/documentation/web-api/  

App is 100% Client/Frontend based hense used Spotify [Implicit Grant Flow] 
Implicit Grant Flow does not requires any extra server side requests in order to authenticate which makes it ideal for a client side only app

##### Request Flow 

```
Greeting user with a Login page (Within App) 
Redirect user to Spotify Login/Authentication page (Spotify URL)
Once succesfully logged in and Authorized Redirects back to App (App Search)
Auth Token will be cached in Localstorage for future Usage
```

``
On any event Auth Token is invalidated user will be Redirects back to Authenication page for requesting a new Token 
``

#### API Requests 

##### Search 

| Method | Action |
| ------ | ------ |
| Endpoint | https://api.spotify.com/v1/search |
| HTTP Method | GET |
| Params | OAuth:require , q:required , type:required  |

##### Request (Artist , Album , Track) Data

| Method | Action |
| ------ | ------ |
| Endpoint - Artist | 	https://api.spotify.com/v1/artists/{id} |
| Endpoint - Album | 	https://api.spotify.com/v1/albums/{id} |
| Endpoint - Track | 	https://api.spotify.com/v1/tracks/{id} |
| HTTP Method | GET |
| Params | OAuth:require , id:required  |

##### Get Artists top tracks by Artist ID 

| Method | Action |
| ------ | ------ |
| Endpoint | 		https://api.spotify.com/v1/artists/{id}/top-tracks |
| HTTP Method | GET |
| Params | OAuth:require , id:required  |

### Installation

Clone or Download the [Git Repo] 

```sh
$ cd spotify-search-app
$ npm install
$ npm run
```

### App Usage

- User will be requested to Login & Authorized Access 
- Search by Tracks , Albums and Artists
- Clicking on Track name , artist name or album art will redirect to relavent pages
- User will be able to go back to the search page by cliking/tapping 



##### Login Screen

![alt text](https://i.ibb.co/J2D0Pd7/Login-screen.png)

##### Search 

![alt Search](https://i.ibb.co/1fggX6H/Search-1.png)

##### Album , Artist , Tracks 

![alt Album](https://i.ibb.co/BKVFZmv/Album.png)
![alt Artist](https://i.ibb.co/ys2Qh08/artist.png)
![alt Tracks](https://i.ibb.co/g6mHSNw/Search-2.png)

##### Search No Results 

![alt Search No Results](https://i.ibb.co/7JJLqgD/No-Results.png)

[//]: #
   [Implicit Grant Flow]:<https://developer.spotify.com/documentation/general/guides/authorization-guide/#implicit-grant-flow>
   [Git Repo]:<https://github.com/nipunnirmana/spotify-search-app>
