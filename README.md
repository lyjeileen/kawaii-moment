# Kawaii Moment

## Project Description

'Kawaii' means cute in Japanese. This app allows people to share and watch cute short videos/moments. Most videos here are about animals because they are super cute! Studies have shown that watching cute animals could reduce people's stress levels and improve their mental health. Hope you could enjoy your adventure in the world of cuteness! Functions include uploading videos/avatars to AWS S3, playing videos, setting up profile and subscription.

<hr>

## User Stories

### Main page + Video page

Users could see all the videos on the main page. By clicking the 'Load More' button, more videos would be shown.

If you want to watch a video, simply click on it and it will redirect to the correct video page. The video page shows the video you want to watch along with 3 other videos. The number of views would increase every time someone opens this page.

!["Main page + Video page"](https://github.com/lyjeileen/kawaii-moment/blob/main/public/Demo/Main%20page%20+%20Video%20page.gif?raw=true)

### Login

Users could log in and set up their profiles. Email authentication is used to verify the user's identity. User's avatar will be shown on the navbar after login.

!["Login"](public/Demo/Login.gif)

### Set up

The current name and avatar will be displayed on 'Setup' page. Users could change their names or avatars.

!["Set up"](https://github.com/lyjeileen/kawaii-moment/blob/main/public/Demo/Set%20up%20page.gif?raw=true)

### Channel & Subscriptions

By clicking on someone's avatar or name, the user could go to the channel page of that person which shows all the videos in that channel and the numbers of subscribers. If you have logged in, you can click on the 'Subscribe' button to subscribe to this channel. The button will become 'Unsubscribe' so you could unsubscribe from the channel in the future. The number of subscribers shown will change accordingly.

Logged-in users could see all the videos from subscribed channels on the subscriptions page.

!["Channel & Subscriptions"](https://github.com/lyjeileen/kawaii-moment/blob/main/public/Demo/Channel%20+%20Subscriptions.gif?raw=true)

### Upload video

Users could upload videos. Videos and thumbnail images are stored in the AWS S3 bucket.

!["Login"](public/Demo/Upload.gif)

### Restrictions for unauthenticated users

- The 'Subscribe' button will not be shown on channel page
- Cannot upload video
- Don't have access to 'Subscriptions' page
- Cannot set up profile

!["Logout"](https://github.com/lyjeileen/kawaii-moment/blob/main/public/Demo/Log%20out.gif?raw=true)

### Different screen sizes

I used responsive mobile-first design for this app and it works on any screens including phone, ipad, and destop.

!["Different screen sizes"](https://github.com/lyjeileen/kawaii-moment/blob/main/public/Demo/Different%20screen%20sizes.gif?raw=true)

<hr>

## Challenges

- Learned how to upload images and videos to AWS. This is my first time using AWS. It took me some time to figure out how to connect it with my app and upload files.
- Improved CSS skills (e.g. adjust ratio of image, control position property) when trying to display videos
- Learned how to add 'load more' function

<hr>

## Stack Choices:

- NextJS
- React
- Tailwindcss
- PostgreSQL
- Prisma
- next-auth
- react-player
- aws-sdk
- headless UI

<hr>
