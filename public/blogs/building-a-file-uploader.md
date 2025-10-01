# Building a file uploader using Cloudinary

_October ??, 2025_

While following the course of TheOdinProject, I was given a project to build a file uploader. It's main objective was to solidify my Prisma and Database concepts. During building, it tested my API knowledge and how well do I navigate the official documentation of a given technology. _(Spoiler: I did well)_

Through this blog, I want to document the process of setting up the project and it will serve me (and to future readers) as a reference to look back upon.

I'll be focusing on Cloudinary's Nodejs SDK. They have SDKs for other languages and their documentation covers it well. The core utilities and functions will be more or less the same.

## What is Cloudinary?

According to Google:

_"Cloudinary is a cloud-based software-as-a-service (SaaS) platform that provides image and video management solutions for web and mobile applications.
"_

## The Setup

You have to first of all sign-up on their website and create an account which will be used to manage your assets.
After which, you'll have to login and it will redirect you to your own console which will look something like this:

![Cloudinary Console](../assets/cloudinary-console.png "Cloudinary Console")
