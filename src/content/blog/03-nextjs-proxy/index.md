---
title: Proxy in Next.js
description: Utilising proxy configs to modify incoming client requests
date: 2026-01-16
tags:
  - nextjs
---
I'm building a product named CampusVault at the moment of writing this. While building this, I'm diving into a lot of concepts and rabbit-holes which I was not aware of earlier. Though I would like to spend time in those rabbit-holes to my heart's content, I'm focusing more towards building the product and getting it out in the world first.

While building it, I came across the concept of proxy in Next.js. For a short answer, it's a middleware but for the edge network.

Let's look at it from a simple analogy.

You're running a company and you're the CEO of it *(duh)*. There are different departments in your company which handle different tasks. Let's say somebody comes in your company. Normally you'd like to have a **receptionist** sat in front of your office, but for the time being let's assume you don't have one.

Now whoever comes in, goes directly to you or any other department's person. The person which has come can be a potential client, or a suspicious one. You don't know. You stop working, open the door, check the visitor's ID, and potentially kick them out if they aren't authorised. This wastes the your time and is a security risk because the intruder got all the way to the door. You will have to do this for every future person visiting your company.

Now this is where the role of your **receptionist** comes into play. Every single person *must* pass the receptionist before they can go further. Your receptionist can take few actions according to the person's request and/or your company's structure:

- **Redirect (Send Away)**: "You are looking for the old office. They moved to a new building. Go there." (Browser URL changes).
- **Rewrite (Stealth Routing):** "You want to see the 'Department of Fun'? Okay, go to Room 101." (The visitor thinks they are in 'Department of Fun', but they are actually in Room 101. The URL generally stays the same).
- **Modify Headers (The Visitor Badge):** "You are allowed in. Here is a 'Visitor' sticker for your shirt." (Adding data to the request so the destination room knows who you are).
- **Block (Response):** "You don't have an ID. You cannot enter." *(Returning a 403 Forbidden message)*.