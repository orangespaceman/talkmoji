# Talkmoji

Are you about to give a talk?

Are your slides made with HTML/CSS/JS?

Do you want live feedback?

Try Talkmoji!

[See an example](https://orangespaceman.github.io/talkmoji/)


## Usage

1. Think of a unique name for your talk: `data-talk="unique-talk-name"`
2. Pick a selection of emoji `data-emoji="😀🖕😴😄"` (or leave this attribute out to use the default set, like on the [example page](https://orangespaceman.github.io/talkmoji/))
3. Add this to your slides:

  ```
  <link rel="stylesheet" href="https://talkmoji.dev.f90.co.uk/css">
  <script src="https://talkmoji.dev.f90.co.uk/js" data-talk="unique-talk-name" data-emoji="😀🖕😴😄"></script>
  ```

4. (Hint: You can leave out the stylesheet and create your own instead to customise its appearance)
5. Share the feedback URL with your audience: [https://talkmoji.dev.f90.co.uk/unique-talk-name](https://talkmoji.dev.f90.co.uk/unique-talk-name)



## Development / Running your own instance

### Installation

1. Install dependencies:

```
yarn
```

2. Run app:

```
node server
```

3. Embed JS in a page:

```
<script src="[path/to/talkmoji/js]" data-talk="[talkId]" data-emoji="😀🖕☹️"></script>
```

4. Optional: Embed CSS in a page:

```
<link rel="stylesheet" src="[path/to/talkmoji/css]"></script>
```

(Alternatively, define your own styles for the talkmoji)

5. Share talkmoji link:

```
https://path.to.talkmoji/talkId
```

## Disclaimer

Made on a train.


## Copyright

Copyright © 2019 Me

This work is free. You can redistribute it and/or modify it under the terms of the Do What The Fuck You Want To Public License, Version 2, as published by Sam Hocevar. See the COPYING file for more details.
