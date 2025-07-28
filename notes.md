


## ALL ORGANIZED!!
only creative things to work on = project nuance + 
experiment with sora / dalle in chatgpt / upscaling apis +
add custom components


## technical
small -> large serving?
squarespace store?
prefetching images
keyboard navigation and clicking
imageveiw scroll bar is annoying




https://www.youtube.com/watch?v=IU_qq_c_lKA&t=499s
https://nextjs.org/docs/pages/api-reference/components/image

check out openai api for editing images


videos in order:
https://www.youtube.com/watch?v=DWaspseTPwc


## todo for ai 1

in the same way this in image veiwer you can use right and left arrow to navigate througt the images, i want for clicking on the right hald of the image to have same effect as clicking riht arrow and i want clicking left half of image to have same effect as clicking left arrow.
## todo for ai 2
In the same home page as my pano.jpg, I want to create a new component that visually zooms into parts of the pano.

Here's the desired behavior:

Base image: Display pano.jpg at the top of the screen.

Zoomed strip:

Below it, with a vertical gap-4, add a new component that displays a zoomed-in strip from pano.jpg.

This strip should have the same width as pano.jpg and a greater height (e.g. 3:2 aspect ratio) to reflect zoom.

It should continuously scroll horizontally (left to right, then loop) through the pano image, giving the effect of a moving window over the pano.

Bounding box indicator:

Overlay a semi-transparent bounding box or highlight on top of pano.jpg to indicate the part currently being shown in the zoomed strip.

This box should move in sync with the scroll of the zoomed strip.

Hover behavior:

When the user hovers their mouse over pano.jpg, pause the scrolling animation.

Center the zoomed strip on the horizontal position of the mouse cursor relative to the pano.

Performance tip:

You can crop directly from pano.jpg using CSS background-position or canvas/image transforms. No need to use 1.jpg, 2.jpg, 3.jpg unless they offer better resolution.

Bonus if you can support smooth transitions when switching from automatic scroll to hover-controlled.
