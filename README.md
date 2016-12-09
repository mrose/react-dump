# reactdump
A visual debugging component for React. Outputs any variable in an easy to read format based on ColdFusion's CFDUMP tag.

Inspired by Andrew Hewitt's [nodedump](https://github.com/ragamufin/nodedump)

Think of it as `console.log` on steroids. Recurses fully into levels deep objects.
Sometimes visualizing a complex object makes it easier to think about.
For example, ```<Reactdump obj={user} />``` might yield:

![reactdump example](https://raw.github.com/ragamufin/nodedump/master/images_for_readme/nodedump-user.png "reactdump of variable 'user'")

Install
-------
[sudo] npm install react-dump

Usage
-----
Import to your component:

```import Reactdump from './Reactdump';```

Include within your component's render() method, passing the object and an optional opts argument

```<Reactdump obj={user} />```

License
-------
MIT

Contributing
------------
Pull requests welcome with accompanying tests
