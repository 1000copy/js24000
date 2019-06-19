We are rewriting [CodeMirror](https://codemirror.net), the open-source code editor for the browser. The new code will provide solid accessibility, touchscreen support, and a modern interface, while matching the existing code in features and performance. This work is currently, fall 2018, in the prototype stage. We've raised money for another year of work, in which we hope to complete it.


The Future of CodeMirror
------------------------

[CodeMirror](https://codemirror.net), as an open source project, has been going for over ten years. Since 2011, for versions 2 to 5, its architecture and programming interface have been more or less stable. In 2011 IE6 had a significant market share, Chrome was just getting started, and jQuery was considered the gold standard of interface design. It was a different time.

While CodeMirror's architecture has held up pretty well, its age is starting to show. Issues related to touchscreen support, accessibility, and bidirectional text have been piling up in the bug tracker because, with the current architecture, they are extremely hard to address.

On top of that, the JavaScript community's approach to modularity and taste in interfaces has matured a lot in this time. With another project—[ProseMirror](https://prosemirror.net)—we've seen how well a modular system and linear data flow architecture can work for an editor. From a current perspective, CodeMirror's current programming interface feels outdated and clunky.

So we've been working on a new version of the library, with new architecture intending to address the current system's shortcomings from the ground up.

This work is currently at the _prototype_ stage, it's going to take a while more before it can be used in production. But it's already showing great promise.

*   It's accessible. Because browsers have come a long way, we can leave more to the browser, and don't have to "fake" the editing process by implementing it in JavaScript. This makes the editor much more transparent to screen readers and other accessibility tools.
    
*   It works on your phone. Again, not having to fake things pays off. Instead of showing a bunch of DOM elements that look like a selection, you are now working with the native selection, so you can manipulate it in a touchscreen interface.
    
*   It gets out of the way and leaves handling of complicated Unicode features such a bidirectional text to the browser, which tends to be better at this than we are.
    
*   It allows more ambitious extensions. The existing system, in which you registered callbacks to respond to editor events, quickly got messy when you needed to keep non-trivial state in sync with the document or selection. By moving to a more disciplined system based on transactions, we're making it easier to build extensions like collaborative editing or incremental code analysis.
    
*   It's modular. Improvements to the core editor's programming interface allow us to move many things that used to be in the core, such as syntax highlighting, into separate modules. There _will_ be an easy-to-use base module that gives you a complete editor, but if you want to, you can take that apart and build something very different from the pieces.
    
*   It is still fast, and can load large documents without significantly slowing down, by only drawing the visible content and painstakingly avoiding doing work that doesn't need to be done.
    
*   It is written in [TypeScript](https://www.typescriptlang.org/), and exposes a well-considered, cleanly typed programming interface.
    

If you're curious about the details, we've written more about the new architecture in [the design document](design.html). The current code is [on GitHub](https://github.com/codemirror/codemirror.next).

That's the good news. It does come with some bad news. The programming interface for the editor is going to change radically, so when the time comes to upgrade, that might be quite a bit of work. We do have plans to write a compatibility wrapper which will allow _simple_ setups to just drop that in, but it probably won't cover the whole old interface, and might turn out to be too slow if you're using the interface intensively. Additionally, the browser DOM structure of the editor will necessarily change, so you'll have to adjust your styles.

The Work Ahead
--------------

The main areas of work that need to be addressed for this project to become a success are:

*   Finish and stabilize the core modules. Getting a design right requires experiments, much testing, outside feedback, and a lot of iterations. To avoid churn in the future, we want to invest in this before we declare the library to be stable.
    
*   Port the essential plugins that people want in a code editor. This includes things like autocompletion infrastructure, bracket matching and autoclosing, linter integration, code folding, and so on.
    
*   Make it possible to run language highlighters written for CodeMirror 5 in the new editor.
    
*   Design an improved system for language highlighters which makes it easier to write highlighters for new languages and avoids some of the design mistakes of the old system, such as the fact that it uses lines as the smallest unit of work.
    
*   Write that compatibility wrapper.
    
*   Document the system (more throughly than we are currently doing).
    
*   Handle the tall stack of bug reports that will no doubt come in once the community starts testing and deploying the library.
    

Demo
----

The editor below shows off the current state of our work. It is the new editor core, with the old JavaScript highlighter wired in and some plugins enabled, such as the undo history and a line number gutter.

Note that this is a first version, not a fully finished piece of software. If you find something that's broken, we're grateful for [bug reports](https://github.com/codemirror/codemirror.next/issues). For other feedback, please use [this forum thread](https://discuss.codemirror.net/t/announcing-work-has-started-on-codemirror-6/1817)