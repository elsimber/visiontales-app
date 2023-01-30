# iSight-MobileApp

Vision Tales is an application that will display videos created by Cherish Eyesight and Vision, as well as provide quizzes on quiz content and additional related eye health resources for users. Administrators of the app can add, delete, and edit videos and quizzes, as well as see the results of users taking those quizzes. Users can only see the videos and take the quizzes, without any editing permissions, as well as viewing additional resources and uploading very basic demographic data.

### Built With

* [React.js](https://reactjs.org/)
* [expo-sqlite](https://docs.expo.dev/versions/latest/sdk/sqlite/)
* [AWS]-->[lambda function, DynamoDB, API Gateway]

!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```
* expo-cli
  ```sh
  npm install --global expo-cli
  ```
* Expo Go
  Install Expo Go in App sotre and install it on your phone
  
<p align="right">(<a href="#top">back to top</a>)</p>

  
### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Team-iSight/iSight-MobileApp.git
   ```

<p align="right">(<a href="#top">back to top</a>)</p>

### Run the Code

A. Run the the Admin version of the app

1. Go inside of the 'VisionTalesAdmin' folder by using command 'cd [relative path to the folder]'
  ```sh
   cd VisionTalesAdmin
   ```
2. Install dependency packages
   ```sh
   npm install
   ```
3. run the native application
    ```sh
   expo start
   ```
4. Run the server
   Copy the address to your searching engine
   (For example: http://localhost:19002)
   A new page like the picture below would show up 
   ![image](https://user-images.githubusercontent.com/44754659/163910463-ff543e8f-3ae2-41ad-8aca-dcdacaaa62db.png)
   
   PLEASE Remeber to change CONNECTION to 'Tunnel'

5. Open it on your phone 

  scan the QR code in the web page with your device camera
  Then the app should be opened on your device
  
6. Build the app
   ```sh
   expo build:android
   expo build:ios
   ```
   
B. To end the runing app
 press CTRL + C

C. Run the the Ueser version of the app

1. Go inside of the 'VisionTalesAdmin' folder by using command 'cd [relative path to the folder]'
  ```sh
   cd VisionTales
   ```
2. Install dependency packages
   ```sh
   npm install
   ```
3. run the native application
    ```sh
   expo start
   ```
4. Run the server
   Copy the address to your searching engine
   (For example: http://localhost:19002)
   A new page like the picture below would show up 
   ![image](https://user-images.githubusercontent.com/44754659/163910463-ff543e8f-3ae2-41ad-8aca-dcdacaaa62db.png)
   
   PLEASE Remeber to change CONNECTION to 'Tunnel'

5. Open it on your phone 

  scan the QR code in the web page with your device camera
  Then the app should be opened on your device
  
<p align="right">(<a href="#top">back to top</a>)</p>
    
