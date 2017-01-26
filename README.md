# react-dump
A visual debugging component for React.
Outputs any variable in an easy to read format based on ColdFusion's CFDUMP tag.

Better than `console.log` (recurses fully).
Less complex than React Developer Tools.
Sometimes visualizing a complex object makes it easier to think about.
For example, ```<ReactDump obj={user} />``` might yield:

![Reactdump example](https://raw.github.com/ragamufin/nodedump/master/images_for_readme/nodedump-user.png "Reactdump of variable 'user'")

Inspired in part by Andrew Hewitt's [nodedump](https://github.com/ragamufin/nodedump)

Install
-------
[sudo] npm install react-dump --save-dev

Usage
-----
Import to your component:

```import ReactDump from 'react-dump';```

Include within your component's render() method, passing the object and an optional opts argument

```<ReactDump obj={user} />```

License
-------
MIT

Contributing
------------
Pull requests welcome with accompanying tests
