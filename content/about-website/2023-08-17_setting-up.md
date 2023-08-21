+++
title = "Setting up the website"
authors = ["Chase"]
[taxonomies]
category=["website"]
tags=["web", "development", "zola"]
+++

This is going to be a more technical focused post about how I made this website. 
If you want to know more about myself and finding neocities, there's a [blogpost](@/blog/2023-08-17_finding-neocities.md) for that

After finding neocities and clicking around a bit I knew I wanted to set up a website for myself. I often wanted a place to write things, post things I like and just as a place for people to find out about me. 
But it's always been a daunting task. I feel neocities is an open enough community for people to not judge a website by its cover. It's about making stuff. So how would i go about making a website?

Easy enough question. I'm a software developer and a web dev after all. Take a html file and slap stuff in there.

![typing gif](https://gifrific.com/wp-content/uploads/2012/04/bruce-almighty-type.gif)

But i build enough websites to know how quickly simple html files can become an absolute pain. 
They need to be rendered on the client, dumping kilobytes worth of JS onto an unsuspecting user, manually copied over 
to keep style and reoccurring elements the same or build on the server using php.

Or one could compile a template into html. Have a nice repository with templates, all the content, assets etc. And generate a static html out of that.
This can be archived using static-site-generation. The output is plain old html. The only js that is included is the one you put in.

## Finding the right generator
(because yes, we are doing sections now)

I have never worked with anything even close to static-site generation. The closest was using template engines in spring projects, 
which can render html on the fly. Neat, but not what I was looking for.

After looking around for a bit I quickly discovered [jamstack](https://jamstack.org/generators/) and their massive list of static-site-generators. 
(Don't get discouraged by the "Language" tag, that's the language the generator is written in. I made that mistake at first)

The generators I found there were not what i was looking for at first. They had CMS, react, but compiled, GitBook implementations and documentation generators. 
A lot of "react", "enterprise level" and "framework". I don't need a framework. I need a script that I throw some annotated HTML at to do some magic.

Then I read it. `A fast static site generator in a single binary with everything build in`. Written in rust. That caught my attention. 
From personal experience rust people tend to be very "no-bullshit" kind of people. Also pretty decent programmers.

## Zola
[Zola](https://www.getzola.org/) is pretty close to what I need. HTML-Templates, blog posts as markdown and a few useful functions throw in for 
extra flavour, with the possibility of easily extending the functionality using shortcodes. You install it as a single binary, 
create a folder and with a single `zola serve` you have a website. The quick start leads you through the important parts 
and gets a website up and running quickly. Most content, including this blogpost is written in "augmented markdown". 
So just markdown with a few extra functions. But you can also skip that part and just make a good ol' html page.

## The struggles
A few things I did trip over while developing:
- Zola has a very strict folder structure. Almost every folder has a specific use and file names are important. 
    It's all written down on their website, but I made sure to first break everything multiple times before reading the documentation
- Static files need to go into the static folder (duh), that includes fonts, styles, images etc
- You can put static files with the content, but I didn't. No further explanation
- Fonts are hard. Just look up a proper tutorial if you want to use webfonts on your website, don't do what i did.

## Getting everything to look nice
If you don't want to go through the trouble of setting up a website layout and getting everything to look nice. Just use the [layout-builder](https://sadgrl.online/projects/layout-builder) sadgrl made. 
It gets you up and running in literal minutes. You can make changes later. Nothing is permanent