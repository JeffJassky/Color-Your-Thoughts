# Color Your Thoughts
Color Your Thoughts is an interactive Javascript browser-based experiment that paints your screen in color palettes based on your spoken words.

## Setup
1. Download: ```git clone https://github.com/JeffJassky/Color-Your-Thoughts.git```
2. Install: ```npm install```
3. Launch: ```node server.js```
4. View: ```http://localhost:3000``` (Only tested in Chrome 63)

## Usage
1. Find a quiet space
2. Enable your microphone
3. Speak a colorful word or phrase.

## How does it work?
Color Your thoughts uses your microphone to capture words and phrases.
Speech Recognition is used to translate your audible speech to text.
A Google Images search is performed on your text.
Colors from the resulting images are represented as a vibrant palette on the screen.

## What's next?
### Polishing what's here
Obfuscate the Google Images API Key and CX by moving the query to a server-side proxy, adding loading indicators between search terms, circumventing daily limitations on Google Images API, create handling for edge cases like sitting idle without speaking for long periods of time, and limit image search to photographs only, which is currently configured according to Google search docs, however results are not coming back as expected. Would file ticket with Google.

### Feature ideas
Saving individual color palettes & color palette history, adding audio for ambient sounds and user cursor and voice interactions.
