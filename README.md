# grunt-xslt

> This plugin will help create xslt files from html template.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-xslt --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-xslt');
```

## The "xslt" task

### Overview
In your project's Gruntfile, add a section named `xslt` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  xslt: {
    replacements: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.replacements
Type: `Object`
Default value: `{}`

An object that is used to iterate over to make it possible to replace items in an xslt.

### Usage Examples

#### Default Options
In this example, the replacements that are used are as follows. The key in the replacements matches the value in the files objects (srcTest/custom_template.xslt).

#####custom_template.xslt
```html
<!-- *** START OF STYLESHEET *** -->

<!-- **********************************************************************
 XSL to format the search output for Google Search Appliance
     ********************************************************************** -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="2.0">
    <!-- Please enter html code below. -->

    <xsl:template name="header">
        <div>HTML IS HERE AND WILL BE REPLACED</div>
    </xsl:template>

    <xsl:template name="footer">
        <div>HTML IS HERE AND WILL BE REPLACED</div>
        <div>HTML IS HERE AND WILL BE REPLACED</div>
        <div>HTML IS HERE AND WILL BE REPLACED</div>
    </xsl:template>

</xsl:stylesheet>


        <!-- *** END OF STYLESHEET *** -->

```

#####global-header.html
```html
<div>Some Html Header</div>
```


#####global-footer.html
```html
<div>Some Html Footer</div>
```

```js
grunt.initConfig({
  xslt: {
    options: {
        replacements:{
                        'srcTest/custom_template.xslt' : [
                            {
                                'header': [
                                    '<link rel="stylesheet" href="/gassets/global-header-footer.min.css"/>',
                                    'srcTest/global-header.html'
                                ]
                            },
                            {
                                'footer': [
                                    'srcTest/global-footer.html',
                                    '<script type="text/javascript" src="/gassets/global-footer.min.js"></script>'
                                ]
                            }
                        ]
                    }
    },
    files: {
      'tmp/custom_template.xslt':'srcTest/custom_template.xslt'
    },
  },
});
```

#####Result in tmp/custom_template.xslt yields:

```html
<!-- *** START OF STYLESHEET *** --><!-- ********************************************************************** XSL to format the search output for Google Search Appliance     ********************************************************************** -->
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
                version="2.0">    <!-- Please enter html code below. -->
    <xsl:template name="header">
        <link rel="stylesheet" href="/gassets/global-header-footer.min.css"/>
        <div>Some Html Header</div>
    </xsl:template>
    <xsl:template name="footer">
        <div>Some Html Footer</div>
        <script type="text/javascript" src="/gassets/global-footer.min.js"></script>
    </xsl:template>
</xsl:stylesheet>        <!-- *** END OF STYLESHEET *** -->
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
0.1.0
