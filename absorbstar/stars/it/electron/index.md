[About Electron](#about-electron)
=================================

[Electron](https://electronjs.org) is an open source library developed by GitHub for building cross-platform desktop applications with HTML, CSS, and JavaScript. Electron accomplishes this by combining [Chromium](https://www.chromium.org/Home) and [Node.js](https://nodejs.org) into a single runtime and apps can be packaged for Mac, Windows, and Linux.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Read on to learn more about the contributors and releases of Electron or get started building with Electron in the [Quick Start Guide](/docs/tutorial/quick-start).

[Core Team and Contributors](#core-team-and-contributors)
---------------------------------------------------------

Electron is maintained by a team at GitHub as well as a group of [active contributors](https://github.com/electron/electron/graphs/contributors) from the community. Some of the contributors are individuals and some work at larger companies who are developing on Electron. We're happy to add frequent contributors to the project as maintainers. Read more about [contributing to Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

[Releases](#releases)
---------------------

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### [Updating Dependencies](#updating-dependencies)

Electron's version of Chromium is usually updated within one or two weeks after a new stable Chromium version is released, depending on the effort involved in the upgrade.

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.

### [Versioning](#versioning)

As of version 2.0 Electron [follows `semver`](https://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](/docs/tutorial/electron-versioning).

### [LTS](#lts)

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

[Core Philosophy](#core-philosophy)
-----------------------------------

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

[History](#history)
-------------------

Below are milestones in Electron's history.

📆

🎉

**April 2013**

[Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45) .

**May 2014**

[Atom Shell is open sourced](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html) .

**April 2015**

[Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389) .

**May 2016**

[Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0) .

**May 2016**

[Electron apps compatible with Mac App Store](/docs/tutorial/mac-app-store-submission-guide) .

**August 2016**

[Windows Store support for Electron apps](/docs/tutorial/windows-store-guide) .

* * *

[Accelerator](#accelerator)
===========================

> Define keyboard shortcuts.

Accelerators are Strings that can contain multiple modifiers and a single key code, combined by the `+` character, and are used to define keyboard shortcuts throughout your application.

Examples:

*   `CommandOrControl+A`
*   `CommandOrControl+Shift+Z`

Shortcuts are registered with the [`globalShortcut`](/docs/api/global-shortcut) module using the [`register`](/docs/api/global-shortcut#globalshortcutregisteraccelerator-callback) method, i.e.

    const { app, globalShortcut } = require('electron')
    
    app.on('ready', () => {
      // Register a 'CommandOrControl+Y' shortcut listener.
      globalShortcut.register('CommandOrControl+Y', () => {
        // Do stuff when Y and either Command/Control is pressed.
      })
    })

[Platform notice](#platform-notice)
-----------------------------------

On Linux and Windows, the `Command` key does not have any effect so use `CommandOrControl` which represents `Command` on macOS and `Control` on Linux and Windows to define some accelerators.

Use `Alt` instead of `Option`. The `Option` key only exists on macOS, whereas the `Alt` key is available on all platforms.

The `Super` key is mapped to the `Windows` key on Windows and Linux and `Cmd` on macOS.

[Available modifiers](#available-modifiers)
-------------------------------------------

*   `Command` (or `Cmd` for short)
*   `Control` (or `Ctrl` for short)
*   `CommandOrControl` (or `CmdOrCtrl` for short)
*   `Alt`
*   `Option`
*   `AltGr`
*   `Shift`
*   `Super`

[Available key codes](#available-key-codes)
-------------------------------------------

*   `0` to `9`
*   `A` to `Z`
*   `F1` to `F24`
*   Punctuations like `~`, `!`, `@`, `#`, `$`, etc.
*   `Plus`
*   `Space`
*   `Tab`
*   `Backspace`
*   `Delete`
*   `Insert`
*   `Return` (or `Enter` as alias)
*   `Up`, `Down`, `Left` and `Right`
*   `Home` and `End`
*   `PageUp` and `PageDown`
*   `Escape` (or `Esc` for short)
*   `VolumeUp`, `VolumeDown` and `VolumeMute`
*   `MediaNextTrack`, `MediaPreviousTrack`, `MediaStop` and `MediaPlayPause`
*   `PrintScreen`

* * *

[Accessibility](#accessibility)
===============================

Making accessible applications is important and we're happy to introduce new functionality to [Devtron](https://electronjs.org/devtron) and [Spectron](https://electronjs.org/spectron) that gives developers the opportunity to make their apps better for everyone.

* * *

Accessibility concerns in Electron applications are similar to those of websites because they're both ultimately HTML. With Electron apps, however, you can't use the online resources for accessibility audits because your app doesn't have a URL to point the auditor to.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Read on for a summary of the tools.

[Spectron](#spectron)
---------------------

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. For example:

    app.client.auditAccessibility().then(function (audit) {
      if (audit.failed) {
        console.error(audit.message)
      }
    })

You can read more about this feature in [Spectron's documentation](https://github.com/electron/spectron#accessibility-testing).

[Devtron](#devtron)
-------------------

In Devtron, there is a new accessibility tab which will allow you to audit a page in your app, sort and filter the results.

![devtron screenshot](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Both of these tools are using the [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) library built by Google for Chrome. You can learn more about the accessibility audit rules this library uses on that [repository's wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

If you know of other great accessibility tools for Electron, add them to the accessibility documentation with a pull request.

[Enabling Accessibility](#enabling-accessibility)
-------------------------------------------------

Electron applications keep accessibility disabled by default for performance reasons but there are multiple ways to enable it.

### [Inside Application](#inside-application)

By using [`app.setAccessibilitySupportEnabled(enabled)`](/docs/api/app#appsetaccessibilitysupportenabledenabled-macos-windows), you can expose accessibility switch to users in the application preferences. User's system assistive utilities have priority over this setting and will override it.

### [Assistive Technology](#assistive-technology)

Electron application will enable accessibility automatically when it detects assistive technology (Windows) or VoiceOver (macOS). See Chrome's [accessibility documentation](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) for more details.

On macOS, third-party assistive technology can switch accessibility inside Electron applications by setting the attribute `AXManualAccessibility` programmatically:

    CFStringRef kAXManualAccessibility = CFSTR("AXManualAccessibility");
    
    + (void)enableAccessibility:(BOOL)enable inElectronApplication:(NSRunningApplication *)app
    {
        AXUIElementRef appRef = AXUIElementCreateApplication(app.processIdentifier);
        if (appRef == nil)
            return;
    
        CFBooleanRef value = enable ? kCFBooleanTrue : kCFBooleanFalse;
        AXUIElementSetAttributeValue(appRef, kAXManualAccessibility, value);
        CFRelease(appRef);
    }

* * *

[app](#app)
===========

> Control your application's event lifecycle.

Process: [Main](/docs/glossary#main-process)

The following example shows how to quit the application when the last window is closed:

    const { app } = require('electron')
    app.on('window-all-closed', () => {
      app.quit()
    })

[Events](#events)
-----------------

The `app` object emits the following events:

### [Event: 'will-finish-launching'](#event-will-finish-launching)

Emitted when the application has finished basic startup. On Windows and Linux, the `will-finish-launching` event is the same as the `ready` event; on macOS, this event represents the `applicationWillFinishLaunching` notification of `NSApplication`. You would usually set up listeners for the `open-file` and `open-url` events here, and start the crash reporter and auto updater.

In most cases, you should do everything in the `ready` event handler.

### [Event: 'ready'](#event-ready)

Returns:

*   `launchInfo` Object _macOS_

Emitted when Electron has finished initializing. On macOS, `launchInfo` holds the `userInfo` of the `NSUserNotification` that was used to open the application, if it was launched from Notification Center. You can call `app.isReady()` to check if this event has already fired.

### [Event: 'window-all-closed'](#event-window-all-closed)

Emitted when all windows have been closed.

If you do not subscribe to this event and all windows are closed, the default behavior is to quit the app; however, if you subscribe, you control whether the app quits or not. If the user pressed `Cmd + Q`, or the developer called `app.quit()`, Electron will first try to close all the windows and then emit the `will-quit` event, and in this case the `window-all-closed` event would not be emitted.

### [Event: 'before-quit'](#event-before-quit)

Returns:

*   `event` Event

Emitted before the application starts closing its windows. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

**Note:** If application quit was initiated by `autoUpdater.quitAndInstall()` then `before-quit` is emitted _after_ emitting `close` event on all windows and closing them.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### [Event: 'will-quit'](#event-will-quit)

Returns:

*   `event` Event

Emitted when all windows have been closed and the application will quit. Calling `event.preventDefault()` will prevent the default behaviour, which is terminating the application.

See the description of the `window-all-closed` event for the differences between the `will-quit` and `window-all-closed` events.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### [Event: 'quit'](#event-quit)

Returns:

*   `event` Event
*   `exitCode` Integer

Emitted when the application is quitting.

**Note:** On Windows, this event will not be emitted if the app is closed due to a shutdown/restart of the system or a user logout.

### [Event: 'open-file' _macOS_](#event-open-file-macos)

Returns:

*   `event` Event
*   `path` String

Emitted when the user wants to open a file with the application. The `open-file` event is usually emitted when the application is already open and the OS wants to reuse the application to open the file. `open-file` is also emitted when a file is dropped onto the dock and the application is not yet running. Make sure to listen for the `open-file` event very early in your application startup to handle this case (even before the `ready` event is emitted).

You should call `event.preventDefault()` if you want to handle this event.

On Windows, you have to parse `process.argv` (in the main process) to get the filepath.

### [Event: 'open-url' _macOS_](#event-open-url-macos)

Returns:

*   `event` Event
*   `url` String

Emitted when the user wants to open a URL with the application. Your application's `Info.plist` file must define the url scheme within the `CFBundleURLTypes` key, and set `NSPrincipalClass` to `AtomApplication`.

You should call `event.preventDefault()` if you want to handle this event.

### [Event: 'activate' _macOS_](#event-activate-macos)

Returns:

*   `event` Event
*   `hasVisibleWindows` Boolean

Emitted when the application is activated. Various actions can trigger this event, such as launching the application for the first time, attempting to re-launch the application when it's already running, or clicking on the application's dock or taskbar icon.

### [Event: 'continue-activity' _macOS_](#event-continue-activity-macos)

Returns:

*   `event` Event
*   `type` String - A string identifying the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `userInfo` Object - Contains app-specific state stored by the activity on another device.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) when an activity from a different device wants to be resumed. You should call `event.preventDefault()` if you want to handle this event.

A user activity can be continued only in an app that has the same developer Team ID as the activity's source app and that supports the activity's type. Supported activity types are specified in the app's `Info.plist` under the `NSUserActivityTypes` key.

### [Event: 'will-continue-activity' _macOS_](#event-will-continue-activity-macos)

Returns:

*   `event` Event
*   `type` String - A string identifying the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) before an activity from a different device wants to be resumed. You should call `event.preventDefault()` if you want to handle this event.

### [Event: 'continue-activity-error' _macOS_](#event-continue-activity-error-macos)

Returns:

*   `event` Event
*   `type` String - A string identifying the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `error` String - A string with the error's localized description.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) when an activity from a different device fails to be resumed.

### [Event: 'activity-was-continued' _macOS_](#event-activity-was-continued-macos)

Returns:

*   `event` Event
*   `type` String - A string identifying the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `userInfo` Object - Contains app-specific state stored by the activity.

Emitted during [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) after an activity from this device was successfully resumed on another one.

### [Event: 'update-activity-state' _macOS_](#event-update-activity-state-macos)

Returns:

*   `event` Event
*   `type` String - A string identifying the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `userInfo` Object - Contains app-specific state stored by the activity.

Emitted when [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) is about to be resumed on another device. If you need to update the state to be transferred, you should call `event.preventDefault()` immediately, construct a new `userInfo` dictionary and call `app.updateCurrentActiviy()` in a timely manner. Otherwise the operation will fail and `continue-activity-error` will be called.

### [Event: 'new-window-for-tab' _macOS_](#event-new-window-for-tab-macos)

Returns:

*   `event` Event

Emitted when the user clicks the native macOS new tab button. The new tab button is only visible if the current `BrowserWindow` has a `tabbingIdentifier`

### [Event: 'browser-window-blur'](#event-browser-window-blur)

Returns:

*   `event` Event
*   `window` [BrowserWindow](/docs/api/browser-window)

Emitted when a [browserWindow](/docs/api/browser-window) gets blurred.

### [Event: 'browser-window-focus'](#event-browser-window-focus)

Returns:

*   `event` Event
*   `window` [BrowserWindow](/docs/api/browser-window)

Emitted when a [browserWindow](/docs/api/browser-window) gets focused.

### [Event: 'browser-window-created'](#event-browser-window-created)

Returns:

*   `event` Event
*   `window` [BrowserWindow](/docs/api/browser-window)

Emitted when a new [browserWindow](/docs/api/browser-window) is created.

### [Event: 'web-contents-created'](#event-web-contents-created)

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/api/web-contents)

Emitted when a new [webContents](/docs/api/web-contents) is created.

### [Event: 'certificate-error'](#event-certificate-error)

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/api/web-contents)
*   `url` String
*   `error` String - The error code
*   `certificate` [Certificate](/docs/api/structures/certificate)
*   `callback` Function
    
    *   `isTrusted` Boolean - Whether to consider the certificate as trusted

Emitted when failed to verify the `certificate` for `url`, to trust the certificate you should prevent the default behavior with `event.preventDefault()` and call `callback(true)`.

    const { app } = require('electron')
    
    app.on('certificate-error', (event, webContents, url, error, certificate, callback) => {
      if (url === 'https://github.com') {
        // Verification logic.
        event.preventDefault()
        callback(true)
      } else {
        callback(false)
      }
    })

### [Event: 'select-client-certificate'](#event-select-client-certificate)

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/api/web-contents)
*   `url` URL
*   `certificateList` [Certificate\[\]](/docs/api/structures/certificate)
*   `callback` Function
    
    *   `certificate` [Certificate](/docs/api/structures/certificate) (optional)

Emitted when a client certificate is requested.

The `url` corresponds to the navigation entry requesting the client certificate and `callback` can be called with an entry filtered from the list. Using `event.preventDefault()` prevents the application from using the first certificate from the store.

    const { app } = require('electron')
    
    app.on('select-client-certificate', (event, webContents, url, list, callback) => {
      event.preventDefault()
      callback(list[0])
    })

### [Event: 'login'](#event-login)

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/api/web-contents)
*   `request` Object
    
    *   `method` String
    *   `url` URL
    *   `referrer` URL
*   `authInfo` Object
    
    *   `isProxy` Boolean
    *   `scheme` String
    *   `host` String
    *   `port` Integer
    *   `realm` String
*   `callback` Function
    
    *   `username` String
    *   `password` String

Emitted when `webContents` wants to do basic auth.

The default behavior is to cancel all authentications, to override this you should prevent the default behavior with `event.preventDefault()` and call `callback(username, password)` with the credentials.

    const { app } = require('electron')
    
    app.on('login', (event, webContents, request, authInfo, callback) => {
      event.preventDefault()
      callback('username', 'secret')
    })

### [Event: 'gpu-process-crashed'](#event-gpu-process-crashed)

Returns:

*   `event` Event
*   `killed` Boolean

Emitted when the gpu process crashes or is killed.

### [Event: 'accessibility-support-changed' _macOS_ _Windows_](#event-accessibility-support-changed-macos-windows)

Returns:

*   `event` Event
*   `accessibilitySupportEnabled` Boolean - `true` when Chrome's accessibility support is enabled, `false` otherwise.

Emitted when Chrome's accessibility support changes. This event fires when assistive technologies, such as screen readers, are enabled or disabled. See [https://www.chromium.org/developers/design-documents/accessibility](https://www.chromium.org/developers/design-documents/accessibility) for more details.

### [Event: 'session-created'](#event-session-created)

Returns:

*   `session` [Session](/docs/api/session)

Emitted when Electron has created a new `session`.

    const { app } = require('electron')
    
    app.on('session-created', (event, session) => {
      console.log(session)
    })

### [Event: 'second-instance'](#event-second-instance)

Returns:

*   `event` Event
*   `argv` String\[\] - An array of the second instance's command line arguments
*   `workingDirectory` String - The second instance's working directory

This event will be emitted inside the primary instance of your application when a second instance has been executed. `argv` is an Array of the second instance's command line arguments, and `workingDirectory` is its current working directory. Usually applications respond to this by making their primary window focused and non-minimized.

This event is guaranteed to be emitted after the `ready` event of `app` gets emitted.

### [Event: 'remote-require'](#event-remote-require)

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/api/web-contents)
*   `moduleName` String

Emitted when `remote.require()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### [Event: 'remote-get-global'](#event-remote-get-global)

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/api/web-contents)
*   `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

### [Event: 'remote-get-builtin'](#event-remote-get-builtin)

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/api/web-contents)
*   `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

### [Event: 'remote-get-current-window'](#event-remote-get-current-window)

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/api/web-contents)

Emitted when `remote.getCurrentWindow()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### [Event: 'remote-get-current-web-contents'](#event-remote-get-current-web-contents)

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/api/web-contents)

Emitted when `remote.getCurrentWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### [Event: 'remote-get-guest-web-contents'](#event-remote-get-guest-web-contents)

Returns:

*   `event` Event
*   `webContents` [WebContents](/docs/api/web-contents)
*   `guestWebContents` [WebContents](/docs/api/web-contents)

Emitted when `<webview>.getWebContents()` is called in the renderer process of `webContents`. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

[Methods](#methods)
-------------------

The `app` object has the following methods:

**Note:** Some methods are only available on specific operating systems and are labeled as such.

### [`app.quit()`](#appquit)

Try to close all windows. The `before-quit` event will be emitted first. If all windows are successfully closed, the `will-quit` event will be emitted and by default the application will terminate.

This method guarantees that all `beforeunload` and `unload` event handlers are correctly executed. It is possible that a window cancels the quitting by returning `false` in the `beforeunload` event handler.

### [`app.exit([exitCode])`](#appexitexitcode)

*   `exitCode` Integer (optional)

Exits immediately with `exitCode`. `exitCode` defaults to 0.

All windows will be closed immediately without asking user and the `before-quit` and `will-quit` events will not be emitted.

### [`app.relaunch([options])`](#apprelaunchoptions)

*   `options` Object (optional)
    
    *   `args` String[](/docs/api/optional)
    *   `execPath` String (optional)

Relaunches the app when current instance exits.

By default the new instance will use the same working directory and command line arguments with current instance. When `args` is specified, the `args` will be passed as command line arguments instead. When `execPath` is specified, the `execPath` will be executed for relaunch instead of current app.

Note that this method does not quit the app when executed, you have to call `app.quit` or `app.exit` after calling `app.relaunch` to make the app restart.

When `app.relaunch` is called for multiple times, multiple instances will be started after current instance exited.

An example of restarting current instance immediately and adding a new command line argument to the new instance:

    const { app } = require('electron')
    
    app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
    app.exit(0)

### [`app.isReady()`](#appisready)

Returns `Boolean` - `true` if Electron has finished initializing, `false` otherwise.

### [`app.whenReady()`](#appwhenready)

Returns `Promise<void>` - fulfilled when Electron is initialized. May be used as a convenient alternative to checking `app.isReady()` and subscribing to the `ready` event if the app is not ready yet.

### [`app.focus()`](#appfocus)

On Linux, focuses on the first visible window. On macOS, makes the application the active app. On Windows, focuses on the application's first window.

### [`app.hide()` _macOS_](#apphide-macos)

Hides all application windows without minimizing them.

### [`app.show()` _macOS_](#appshow-macos)

Shows application windows after they were hidden. Does not automatically focus them.

### [`app.getAppPath()`](#appgetapppath)

Returns `String` - The current application directory.

### [`app.getPath(name)`](#appgetpathname)

*   `name` String

Returns `String` - A path to a special directory or file associated with `name`. On failure an `Error` is thrown.

You can request the following paths by the name:

*   `home` User's home directory.
*   `appData` Per-user application data directory, which by default points to:
    
    *   `%APPDATA%` on Windows
    *   `$XDG_CONFIG_HOME` or `~/.config` on Linux
    *   `~/Library/Application Support` on macOS
*   `userData` The directory for storing your app's configuration files, which by default it is the `appData` directory appended with your app's name.
*   `temp` Temporary directory.
*   `exe` The current executable file.
*   `module` The `libchromiumcontent` library.
*   `desktop` The current user's Desktop directory.
*   `documents` Directory for a user's "My Documents".
*   `downloads` Directory for a user's downloads.
*   `music` Directory for a user's music.
*   `pictures` Directory for a user's pictures.
*   `videos` Directory for a user's videos.
*   `logs` Directory for your app's log folder.
*   `pepperFlashSystemPlugin` Full path to the system version of the Pepper Flash plugin.

### [`app.getFileIcon(path[, options], callback)`](#appgetfileiconpath-options-callback)

*   `path` String
*   `options` Object (optional)
    
    *   `size` String
        
        *   `small` - 16x16
        *   `normal` - 32x32
        *   `large` - 48x48 on _Linux_, 32x32 on _Windows_, unsupported on _macOS_.
*   `callback` Function
    
    *   `error` Error
    *   `icon` [NativeImage](/docs/api/native-image)

Fetches a path's associated icon.

On _Windows_, there a 2 kinds of icons:

*   Icons associated with certain file extensions, like `.mp3`, `.png`, etc.
*   Icons inside the file itself, like `.exe`, `.dll`, `.ico`.

On _Linux_ and _macOS_, icons depend on the application associated with file mime type.

### [`app.setPath(name, path)`](#appsetpathname-path)

*   `name` String
*   `path` String

Overrides the `path` to a special directory or file associated with `name`. If the path specifies a directory that does not exist, the directory will be created by this method. On failure an `Error` is thrown.

You can only override paths of a `name` defined in `app.getPath`.

By default, web pages' cookies and caches will be stored under the `userData` directory. If you want to change this location, you have to override the `userData` path before the `ready` event of the `app` module is emitted.

### [`app.getVersion()`](#appgetversion)

Returns `String` - The version of the loaded application. If no version is found in the application's `package.json` file, the version of the current bundle or executable is returned.

### [`app.getName()`](#appgetname)

Returns `String` - The current application's name, which is the name in the application's `package.json` file.

Usually the `name` field of `package.json` is a short lowercased name, according to the npm modules spec. You should usually also specify a `productName` field, which is your application's full capitalized name, and which will be preferred over `name` by Electron.

### [`app.setName(name)`](#appsetnamename)

*   `name` String

Overrides the current application's name.

### [`app.getLocale()`](#appgetlocale)

Returns `String` - The current application locale. Possible return values are documented [here](/docs/api/locales).

To set the locale, you'll want to use a command line switch at app startup, which may be found [here](https://github.com/electron/electron/blob/master/docs/api/chrome-command-line-switches.md).

**Note:** When distributing your packaged app, you have to also ship the `locales` folder.

**Note:** On Windows you have to call it after the `ready` events gets emitted.

### [`app.addRecentDocument(path)` _macOS_ _Windows_](#appaddrecentdocumentpath-macos-windows)

*   `path` String

Adds `path` to the recent documents list.

This list is managed by the OS. On Windows you can visit the list from the task bar, and on macOS you can visit it from dock menu.

### [`app.clearRecentDocuments()` _macOS_ _Windows_](#appclearrecentdocuments-macos-windows)

Clears the recent documents list.

### [`app.setAsDefaultProtocolClient(protocol[, path, args])`](#appsetasdefaultprotocolclientprotocol-path-args)

*   `protocol` String - The name of your protocol, without `://`. If you want your app to handle `electron://` links, call this method with `electron` as the parameter.
*   `path` String (optional) _Windows_ - Defaults to `process.execPath`
*   `args` String[](/docs/api/optional) _Windows_ - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

This method sets the current executable as the default handler for a protocol (aka URI scheme). It allows you to integrate your app deeper into the operating system. Once registered, all links with `your-protocol://` will be opened with the current executable. The whole link, including protocol, will be passed to your application as a parameter.

On Windows you can provide optional parameters path, the path to your executable, and args, an array of arguments to be passed to your executable when it launches.

**Note:** On macOS, you can only register protocols that have been added to your app's `info.plist`, which can not be modified at runtime. You can however change the file with a simple text editor or script during build time. Please refer to [Apple's documentation](https://developer.apple.com/library/ios/documentation/General/Reference/InfoPlistKeyReference/Articles/CoreFoundationKeys.html#//apple_ref/doc/uid/TP40009249-102207-TPXREF115) for details.

The API uses the Windows Registry and LSSetDefaultHandlerForURLScheme internally.

### [`app.removeAsDefaultProtocolClient(protocol[, path, args])` _macOS_ _Windows_](#appremoveasdefaultprotocolclientprotocol-path-args-macos-windows)

*   `protocol` String - The name of your protocol, without `://`.
*   `path` String (optional) _Windows_ - Defaults to `process.execPath`
*   `args` String[](/docs/api/optional) _Windows_ - Defaults to an empty array

Returns `Boolean` - Whether the call succeeded.

This method checks if the current executable as the default handler for a protocol (aka URI scheme). If so, it will remove the app as the default handler.

### [`app.isDefaultProtocolClient(protocol[, path, args])`](#appisdefaultprotocolclientprotocol-path-args)

*   `protocol` String - The name of your protocol, without `://`.
*   `path` String (optional) _Windows_ - Defaults to `process.execPath`
*   `args` String[](/docs/api/optional) _Windows_ - Defaults to an empty array

Returns `Boolean`

This method checks if the current executable is the default handler for a protocol (aka URI scheme). If so, it will return true. Otherwise, it will return false.

**Note:** On macOS, you can use this method to check if the app has been registered as the default protocol handler for a protocol. You can also verify this by checking `~/Library/Preferences/com.apple.LaunchServices.plist` on the macOS machine. Please refer to [Apple's documentation](https://developer.apple.com/library/mac/documentation/Carbon/Reference/LaunchServicesReference/#//apple_ref/c/func/LSCopyDefaultHandlerForURLScheme) for details.

The API uses the Windows Registry and LSCopyDefaultHandlerForURLScheme internally.

### [`app.setUserTasks(tasks)` _Windows_](#appsetusertaskstasks-windows)

*   `tasks` [Task\[\]](/docs/api/structures/task) - Array of `Task` objects

Adds `tasks` to the [Tasks](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378460(v=vs.85).aspx#tasks) category of the JumpList on Windows.

`tasks` is an array of [`Task`](/docs/api/structures/task) objects.

Returns `Boolean` - Whether the call succeeded.

**Note:** If you'd like to customize the Jump List even more use `app.setJumpList(categories)` instead.

### [`app.getJumpListSettings()` _Windows_](#appgetjumplistsettings-windows)

Returns `Object`:

*   `minItems` Integer - The minimum number of items that will be shown in the Jump List (for a more detailed description of this value see the [MSDN docs](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378398(v=vs.85).aspx)).
*   `removedItems` [JumpListItem\[\]](/docs/api/structures/jump-list-item) - Array of `JumpListItem` objects that correspond to items that the user has explicitly removed from custom categories in the Jump List. These items must not be re-added to the Jump List in the **next** call to `app.setJumpList()`, Windows will not display any custom category that contains any of the removed items.

### [`app.setJumpList(categories)` _Windows_](#appsetjumplistcategories-windows)

*   `categories` [JumpListCategory\[\]](/docs/api/structures/jump-list-category) or `null` - Array of `JumpListCategory` objects.

Sets or removes a custom Jump List for the application, and returns one of the following strings:

*   `ok` - Nothing went wrong.
*   `error` - One or more errors occurred, enable runtime logging to figure out the likely cause.
*   `invalidSeparatorError` - An attempt was made to add a separator to a custom category in the Jump List. Separators are only allowed in the standard `Tasks` category.
*   `fileTypeRegistrationError` - An attempt was made to add a file link to the Jump List for a file type the app isn't registered to handle.
*   `customCategoryAccessDeniedError` - Custom categories can't be added to the Jump List due to user privacy or group policy settings.

If `categories` is `null` the previously set custom Jump List (if any) will be replaced by the standard Jump List for the app (managed by Windows).

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.

**Note:** Users can remove items from custom categories, and Windows will not allow a removed item to be added back into a custom category until **after** the next successful call to `app.setJumpList(categories)`. Any attempt to re-add a removed item to a custom category earlier than that will result in the entire custom category being omitted from the Jump List. The list of removed items can be obtained using `app.getJumpListSettings()`.

Here's a very simple example of creating a custom Jump List:

    const { app } = require('electron')
    
    app.setJumpList([
      {
        type: 'custom',
        name: 'Recent Projects',
        items: [
          { type: 'file', path: 'C:\\Projects\\project1.proj' },
          { type: 'file', path: 'C:\\Projects\\project2.proj' }
        ]
      },
      { // has a name so `type` is assumed to be "custom"
        name: 'Tools',
        items: [
          {
            type: 'task',
            title: 'Tool A',
            program: process.execPath,
            args: '--run-tool-a',
            icon: process.execPath,
            iconIndex: 0,
            description: 'Runs Tool A'
          },
          {
            type: 'task',
            title: 'Tool B',
            program: process.execPath,
            args: '--run-tool-b',
            icon: process.execPath,
            iconIndex: 0,
            description: 'Runs Tool B'
          }
        ]
      },
      { type: 'frequent' },
      { // has no name and no type so `type` is assumed to be "tasks"
        items: [
          {
            type: 'task',
            title: 'New Project',
            program: process.execPath,
            args: '--new-project',
            description: 'Create a new project.'
          },
          { type: 'separator' },
          {
            type: 'task',
            title: 'Recover Project',
            program: process.execPath,
            args: '--recover-project',
            description: 'Recover Project'
          }
        ]
      }
    ])

### [`app.requestSingleInstanceLock()`](#apprequestsingleinstancelock)

Returns `Boolean`

This method makes your application a Single Instance Application - instead of allowing multiple instances of your app to run, this will ensure that only a single instance of your app is running, and other instances signal this instance and exit.

The return value of this method indicates whether or not this instance of your application successfully obtained the lock. If it failed to obtain the lock you can assume that another instance of your application is already running with the lock and exit immediately.

I.e. This method returns `true` if your process is the primary instance of your application and your app should continue loading. It returns `false` if your process should immediately quit as it has sent its parameters to another instance that has already acquired the lock.

On macOS the system enforces single instance automatically when users try to open a second instance of your app in Finder, and the `open-file` and `open-url` events will be emitted for that. However when users start your app in command line the system's single instance mechanism will be bypassed and you have to use this method to ensure single instance.

An example of activating the window of primary instance when a second instance starts:

    const { app } = require('electron')
    let myWindow = null
    
    const gotTheLock = app.requestSingleInstanceLock()
    
    if (!gotTheLock) {
      app.quit()
    } else {
      app.on('second-instance', (event, commandLine, workingDirectory) => {
        // Someone tried to run a second instance, we should focus our window.
        if (myWindow) {
          if (myWindow.isMinimized()) myWindow.restore()
          myWindow.focus()
        }
      })
    
      // Create myWindow, load the rest of the app, etc...
      app.on('ready', () => {
      })
    }

### [`app.hasSingleInstanceLock()`](#apphassingleinstancelock)

Returns `Boolean`

This method returns whether or not this instance of your app is currently holding the single instance lock. You can request the lock with `app.requestSingleInstanceLock()` and release with `app.releaseSingleInstanceLock()`

### [`app.releaseSingleInstanceLock()`](#appreleasesingleinstancelock)

Releases all locks that were created by `requestSingleInstanceLock`. This will allow multiple instances of the application to once again run side by side.

### [`app.setUserActivity(type, userInfo[, webpageURL])` _macOS_](#appsetuseractivitytype-userinfo-webpageurl-macos)

*   `type` String - Uniquely identifies the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `userInfo` Object - App-specific state to store for use by another device.
*   `webpageURL` String (optional) - The webpage to load in a browser if no suitable app is installed on the resuming device. The scheme must be `http` or `https`.

Creates an `NSUserActivity` and sets it as the current activity. The activity is eligible for [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) to another device afterward.

### [`app.getCurrentActivityType()` _macOS_](#appgetcurrentactivitytype-macos)

Returns `String` - The type of the currently running activity.

### [`app.invalidateCurrentActivity()` _macOS_](#appinvalidatecurrentactivity-macos)

*   `type` String - Uniquely identifies the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).

Invalidates the current [Handoff](https://developer.apple.com/library/ios/documentation/UserExperience/Conceptual/Handoff/HandoffFundamentals/HandoffFundamentals.html) user activity.

### [`app.updateCurrentActivity(type, userInfo)` _macOS_](#appupdatecurrentactivitytype-userinfo-macos)

*   `type` String - Uniquely identifies the activity. Maps to [`NSUserActivity.activityType`](https://developer.apple.com/library/ios/documentation/Foundation/Reference/NSUserActivity_Class/index.html#//apple_ref/occ/instp/NSUserActivity/activityType).
*   `userInfo` Object - App-specific state to store for use by another device.

Updates the current activity if its type matches `type`, merging the entries from `userInfo` into its current `userInfo` dictionary.

### [`app.setAppUserModelId(id)` _Windows_](#appsetappusermodelidid-windows)

*   `id` String

Changes the [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) to `id`.

### [`app.importCertificate(options, callback)` _LINUX_](#appimportcertificateoptions-callback-linux)

*   `options` Object
    
    *   `certificate` String - Path for the pkcs12 file.
    *   `password` String - Passphrase for the certificate.
*   `callback` Function
    
    *   `result` Integer - Result of import.

Imports the certificate in pkcs12 format into the platform certificate store. `callback` is called with the `result` of import operation, a value of `0` indicates success while any other value indicates failure according to Chromium [net\_error\_list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

### [`app.disableHardwareAcceleration()`](#appdisablehardwareacceleration)

Disables hardware acceleration for current app.

This method can only be called before app is ready.

### [`app.disableDomainBlockingFor3DAPIs()`](#appdisabledomainblockingfor3dapis)

By default, Chromium disables 3D APIs (e.g. WebGL) until restart on a per domain basis if the GPU processes crashes too frequently. This function disables that behaviour.

This method can only be called before app is ready.

### [`app.getAppMetrics()`](#appgetappmetrics)

Returns [`ProcessMetric[]`](/docs/api/structures/process-metric): Array of `ProcessMetric` objects that correspond to memory and cpu usage statistics of all the processes associated with the app.

### [`app.getGPUFeatureStatus()`](#appgetgpufeaturestatus)

Returns [`GPUFeatureStatus`](/docs/api/structures/gpu-feature-status) - The Graphics Feature Status from `chrome://gpu/`.

### [`app.getGPUInfo(infoType)`](#appgetgpuinfoinfotype)

*   `infoType` String - Values can be either `basic` for basic info or `complete` for complete info.

Returns `Promise`

For `infoType` equal to `complete`: Promise is fulfilled with `Object` containing all the GPU Information as in [chromium's GPUInfo object](https://chromium.googlesource.com/chromium/src.git/+/69.0.3497.106/gpu/config/gpu_info.cc). This includes the version and driver information that's shown on `chrome://gpu` page.

For `infoType` equal to `basic`: Promise is fulfilled with `Object` containing fewer attributes than when requested with `complete`. Here's an example of basic response:

    { auxAttributes:
       { amdSwitchable: true,
         canSupportThreadedTextureMailbox: false,
         directComposition: false,
         directRendering: true,
         glResetNotificationStrategy: 0,
         inProcessGpu: true,
         initializationTime: 0,
         jpegDecodeAcceleratorSupported: false,
         optimus: false,
         passthroughCmdDecoder: false,
         sandboxed: false,
         softwareRendering: false,
         supportsOverlays: false,
         videoDecodeAcceleratorFlags: 0 },
    gpuDevice:
       [ { active: true, deviceId: 26657, vendorId: 4098 },
         { active: false, deviceId: 3366, vendorId: 32902 } ],
    machineModelName: 'MacBookPro',
    machineModelVersion: '11.5' }

Using `basic` should be preferred if only basic information like `vendorId` or `driverId` is needed.

### [`app.setBadgeCount(count)` _Linux_ _macOS_](#appsetbadgecountcount-linux-macos)

*   `count` Integer

Returns `Boolean` - Whether the call succeeded.

Sets the counter badge for current app. Setting the count to `0` will hide the badge.

On macOS it shows on the dock icon. On Linux it only works for Unity launcher,

**Note:** Unity launcher requires the existence of a `.desktop` file to work, for more information please read [Desktop Environment Integration](/docs/tutorial/desktop-environment-integration#unity-launcher).

### [`app.getBadgeCount()` _Linux_ _macOS_](#appgetbadgecount-linux-macos)

Returns `Integer` - The current value displayed in the counter badge.

### [`app.isUnityRunning()` _Linux_](#appisunityrunning-linux)

Returns `Boolean` - Whether the current desktop environment is Unity launcher.

### [`app.getLoginItemSettings([options])` _macOS_ _Windows_](#appgetloginitemsettingsoptions-macos-windows)

*   `options` Object (optional)
    
    *   `path` String (optional) _Windows_ - The executable path to compare against. Defaults to `process.execPath`.
    *   `args` String[](/docs/api/optional) _Windows_ - The command-line arguments to compare against. Defaults to an empty array.

If you provided `path` and `args` options to `app.setLoginItemSettings` then you need to pass the same arguments here for `openAtLogin` to be set correctly.

Returns `Object`:

*   `openAtLogin` Boolean - `true` if the app is set to open at login.
*   `openAsHidden` Boolean _macOS_ - `true` if the app is set to open as hidden at login. This setting is not available on [MAS builds](/docs/tutorial/mac-app-store-submission-guide).
*   `wasOpenedAtLogin` Boolean _macOS_ - `true` if the app was opened at login automatically. This setting is not available on [MAS builds](/docs/tutorial/mac-app-store-submission-guide).
*   `wasOpenedAsHidden` Boolean _macOS_ - `true` if the app was opened as a hidden login item. This indicates that the app should not open any windows at startup. This setting is not available on [MAS builds](/docs/tutorial/mac-app-store-submission-guide).
*   `restoreState` Boolean _macOS_ - `true` if the app was opened as a login item that should restore the state from the previous session. This indicates that the app should restore the windows that were open the last time the app was closed. This setting is not available on [MAS builds](/docs/tutorial/mac-app-store-submission-guide).

### [`app.setLoginItemSettings(settings)` _macOS_ _Windows_](#appsetloginitemsettingssettings-macos-windows)

*   `settings` Object
    
    *   `openAtLogin` Boolean (optional) - `true` to open the app at login, `false` to remove the app as a login item. Defaults to `false`.
    *   `openAsHidden` Boolean (optional) _macOS_ - `true` to open the app as hidden. Defaults to `false`. The user can edit this setting from the System Preferences so `app.getLoginItemSettings().wasOpenedAsHidden` should be checked when the app is opened to know the current value. This setting is not available on [MAS builds](/docs/tutorial/mac-app-store-submission-guide).
    *   `path` String (optional) _Windows_ - The executable to launch at login. Defaults to `process.execPath`.
    *   `args` String[](/docs/api/optional) _Windows_ - The command-line arguments to pass to the executable. Defaults to an empty array. Take care to wrap paths in quotes.

Set the app's login item settings.

To work with Electron's `autoUpdater` on Windows, which uses [Squirrel](https://github.com/Squirrel/Squirrel.Windows), you'll want to set the launch path to Update.exe, and pass arguments that specify your application name. For example:

    const appFolder = path.dirname(process.execPath)
    const updateExe = path.resolve(appFolder, '..', 'Update.exe')
    const exeName = path.basename(process.execPath)
    
    app.setLoginItemSettings({
      openAtLogin: true,
      path: updateExe,
      args: [
        '--processStart', `"${exeName}"`,
        '--process-start-args', `"--hidden"`
      ]
    })

### [`app.isAccessibilitySupportEnabled()` _macOS_ _Windows_](#appisaccessibilitysupportenabled-macos-windows)

Returns `Boolean` - `true` if Chrome's accessibility support is enabled, `false` otherwise. This API will return `true` if the use of assistive technologies, such as screen readers, has been detected. See [https://www.chromium.org/developers/design-documents/accessibility](https://www.chromium.org/developers/design-documents/accessibility) for more details.

### [`app.setAccessibilitySupportEnabled(enabled)` _macOS_ _Windows_](#appsetaccessibilitysupportenabledenabled-macos-windows)

*   `enabled` Boolean - Enable or disable [accessibility tree](https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/the-accessibility-tree) rendering

Manually enables Chrome's accessibility support, allowing to expose accessibility switch to users in application settings. See [Chromium's accessibility docs](https://www.chromium.org/developers/design-documents/accessibility) for more details. Disabled by default.

This API must be called after the `ready` event is emitted.

**Note:** Rendering accessibility tree can significantly affect the performance of your app. It should not be enabled by default.

### [`app.showAboutPanel()` _macOS_](#appshowaboutpanel-macos)

Show the about panel with the values defined in the app's `.plist` file or with the options set via `app.setAboutPanelOptions(options)`.

### [`app.setAboutPanelOptions(options)` _macOS_](#appsetaboutpaneloptionsoptions-macos)

*   `options` Object
    
    *   `applicationName` String (optional) - The app's name.
    *   `applicationVersion` String (optional) - The app's version.
    *   `copyright` String (optional) - Copyright information.
    *   `credits` String (optional) - Credit information.
    *   `version` String (optional) - The app's build version number.

Set the about panel options. This will override the values defined in the app's `.plist` file. See the [Apple docs](https://developer.apple.com/reference/appkit/nsapplication/1428479-orderfrontstandardaboutpanelwith?language=objc) for more details.

### [`app.startAccessingSecurityScopedResource(bookmarkData)` _macOS (mas)_](#appstartaccessingsecurityscopedresourcebookmarkdata-macos-mas)

*   `bookmarkData` String - The base64 encoded security scoped bookmark data returned by the `dialog.showOpenDialog` or `dialog.showSaveDialog` methods.

Returns `Function` - This function **must** be called once you have finished accessing the security scoped file. If you do not remember to stop accessing the bookmark, [kernel resources will be leaked](https://developer.apple.com/reference/foundation/nsurl/1417051-startaccessingsecurityscopedreso?language=objc) and your app will lose its ability to reach outside the sandbox completely, until your app is restarted.

    // Start accessing the file.
    const stopAccessingSecurityScopedResource = app.startAccessingSecurityScopedResource(data)
    // You can now access the file outside of the sandbox 🎉
    
    // Remember to stop accessing the file once you've finished with it.
    stopAccessingSecurityScopedResource()

Start accessing a security scoped resource. With this method Electron applications that are packaged for the Mac App Store may reach outside their sandbox to access files chosen by the user. See [Apple's documentation](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) for a description of how this system works.

### [`app.commandLine.appendSwitch(switch[, value])`](#appcommandlineappendswitchswitch-value)

*   `switch` String - A command-line switch
*   `value` String (optional) - A value for the given switch

Append a switch (with optional `value`) to Chromium's command line.

**Note:** This will not affect `process.argv`, and is mainly used by developers to control some low-level Chromium behaviors.

### [`app.commandLine.appendArgument(value)`](#appcommandlineappendargumentvalue)

*   `value` String - The argument to append to the command line

Append an argument to Chromium's command line. The argument will be quoted correctly.

**Note:** This will not affect `process.argv`.

### [`app.enableSandbox()` _Experimental_ _macOS_ _Windows_](#appenablesandbox-experimental-macos-windows)

Enables full sandbox mode on the app.

This method can only be called before app is ready.

### [`app.enableMixedSandbox()` _Experimental_ _macOS_ _Windows_](#appenablemixedsandbox-experimental-macos-windows)

Enables mixed sandbox mode on the app.

This method can only be called before app is ready.

### [`app.isInApplicationsFolder()` _macOS_](#appisinapplicationsfolder-macos)

Returns `Boolean` - Whether the application is currently running from the systems Application folder. Use in combination with `app.moveToApplicationsFolder()`

### [`app.moveToApplicationsFolder()` _macOS_](#appmovetoapplicationsfolder-macos)

Returns `Boolean` - Whether the move was successful. Please note that if the move is successful your application will quit and relaunch.

No confirmation dialog will be presented by default, if you wish to allow the user to confirm the operation you may do so using the [`dialog`](/docs/api/dialog) API.

**NOTE:** This method throws errors if anything other than the user causes the move to fail. For instance if the user cancels the authorization dialog this method returns false. If we fail to perform the copy then this method will throw an error. The message in the error should be informative and tell you exactly what went wrong

### [`app.dock.bounce([type])` _macOS_](#appdockbouncetype-macos)

*   `type` String (optional) - Can be `critical` or `informational`. The default is `informational`

When `critical` is passed, the dock icon will bounce until either the application becomes active or the request is canceled.

When `informational` is passed, the dock icon will bounce for one second. However, the request remains active until either the application becomes active or the request is canceled.

Returns `Integer` an ID representing the request.

### [`app.dock.cancelBounce(id)` _macOS_](#appdockcancelbounceid-macos)

*   `id` Integer

Cancel the bounce of `id`.

### [`app.dock.downloadFinished(filePath)` _macOS_](#appdockdownloadfinishedfilepath-macos)

*   `filePath` String

Bounces the Downloads stack if the filePath is inside the Downloads folder.

### [`app.dock.setBadge(text)` _macOS_](#appdocksetbadgetext-macos)

*   `text` String

Sets the string to be displayed in the dock’s badging area.

### [`app.dock.getBadge()` _macOS_](#appdockgetbadge-macos)

Returns `String` - The badge string of the dock.

### [`app.dock.hide()` _macOS_](#appdockhide-macos)

Hides the dock icon.

### [`app.dock.show()` _macOS_](#appdockshow-macos)

Shows the dock icon.

### [`app.dock.isVisible()` _macOS_](#appdockisvisible-macos)

Returns `Boolean` - Whether the dock icon is visible. The `app.dock.show()` call is asynchronous so this method might not return true immediately after that call.

### [`app.dock.setMenu(menu)` _macOS_](#appdocksetmenumenu-macos)

*   `menu` [Menu](/docs/api/menu)

Sets the application's [dock menu](https://developer.apple.com/macos/human-interface-guidelines/menus/dock-menus/).

### [`app.dock.setIcon(image)` _macOS_](#appdockseticonimage-macos)

*   `image` ([NativeImage](/docs/api/native-image) | String)

Sets the `image` associated with this dock icon.

[Properties](#properties)
-------------------------

### [`app.isPackaged`](#appispackaged)

A `Boolean` property that returns `true` if the app is packaged, `false` otherwise. For many apps, this property can be used to distinguish development and production environments.

* * *

[Electron App Feedback Program](#electron-app-feedback-program)
===============================================================

Electron is working on building a streamlined release process and having faster releases. To help with that, we have the App Feedback Program for large-scale Electron apps to test our beta releases and report app-specific issues to the Electron team. We use this program to help us prioritize work and get applications upgraded to the next stable release as soon as possible. There are a few requirements we expect from participants, such as attending short, online weekly check-ins. If you are interested or have questions, please send us a message at info@electronjs.org.

* * *

[Electron Application Architecture](#electron-application-architecture)
=======================================================================

Before we can dive into Electron's APIs, we need to discuss the two process types available in Electron. They are fundamentally different and important to understand.

[Main and Renderer Processes](#main-and-renderer-processes)
-----------------------------------------------------------

In Electron, the process that runs `package.json`'s `main` script is called **the main process**. The script that runs in the main process can display a GUI by creating web pages. An Electron app always has one main process, but never more.

Since Electron uses Chromium for displaying web pages, Chromium's multi-process architecture is also used. Each web page in Electron runs in its own process, which is called **the renderer process**.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

### [Differences Between Main Process and Renderer Process](#differences-between-main-process-and-renderer-process)

The main process creates web pages by creating `BrowserWindow` instances. Each `BrowserWindow` instance runs the web page in its own renderer process. When a `BrowserWindow` instance is destroyed, the corresponding renderer process is also terminated.

The main process manages all web pages and their corresponding renderer processes. Each renderer process is isolated and only cares about the web page running in it.

In web pages, calling native GUI related APIs is not allowed because managing native GUI resources in web pages is very dangerous and it is easy to leak resources. If you want to perform GUI operations in a web page, the renderer process of the web page must communicate with the main process to request that the main process perform those operations.

> #### [Aside: Communication Between Processes](#aside-communication-between-processes)
> 
> In Electron, we have several ways to communicate between the main process and renderer processes, such as [`ipcRenderer`](/docs/api/ipc-renderer) and [`ipcMain`](/docs/api/ipc-main) modules for sending messages, and the [remote](/docs/api/remote) module for RPC style communication. There is also an FAQ entry on [how to share data between web pages](/docs/faq#how-to-share-data-between-web-pages).

[Using Electron APIs](#using-electron-apis)
-------------------------------------------

Electron offers a number of APIs that support the development of a desktop application in both the main process and the renderer process. In both processes, you'd access Electron's APIs by requiring its included module:

    const electron = require('electron')

All Electron APIs are assigned a process type. Many of them can only be used from the main process, some of them only from a renderer process, some from both. The documentation for each individual API will state which process it can be used from.

A window in Electron is for instance created using the `BrowserWindow` class. It is only available in the main process.

    // This will work in the main process, but be `undefined` in a
    // renderer process:
    const { BrowserWindow } = require('electron')
    
    const win = new BrowserWindow()

Since communication between the processes is possible, a renderer process can call upon the main process to perform tasks. Electron comes with a module called `remote` that exposes APIs usually only available on the main process. In order to create a `BrowserWindow` from a renderer process, we'd use the remote as a middle-man:

    // This will work in a renderer process, but be `undefined` in the
    // main process:
    const { remote } = require('electron')
    const { BrowserWindow } = remote
    
    const win = new BrowserWindow()

[Using Node.js APIs](#using-nodejs-apis)
----------------------------------------

Electron exposes full access to Node.js both in the main and the renderer process. This has two important implications:

1) All APIs available in Node.js are available in Electron. Calling the following code from an Electron app works:

    const fs = require('fs')
    
    const root = fs.readdirSync('/')
    
    // This will print all files at the root-level of the disk,
    // either '/' or 'C:\'.
    console.log(root)

As you might already be able to guess, this has important security implications if you ever attempt to load remote content. You can find more information and guidance on loading remote content in our [security documentation](/docs/tutorial/security).

2) You can use Node.js modules in your application. Pick your favorite npm module. npm offers currently the world's biggest repository of open-source code – the ability to use well-maintained and tested code that used to be reserved for server applications is one of the key features of Electron.

As an example, to use the official AWS SDK in your application, you'd first install it as a dependency:

    npm install --save aws-sdk

Then, in your Electron app, require and use the module as if you were building a Node.js application:

    // A ready-to-use S3 Client
    const S3 = require('aws-sdk/clients/s3')

There is one important caveat: Native Node.js modules (that is, modules that require compilation of native code before they can be used) will need to be compiled to be used with Electron.

The vast majority of Node.js modules are _not_ native. Only 400 out of the ~650.000 modules are native. However, if you do need native modules, please consult [this guide on how to recompile them for Electron](/docs/tutorial/using-native-node-modules).

* * *

[Application Debugging](#application-debugging)
===============================================

Whenever your Electron application is not behaving the way you wanted it to, an array of debugging tools might help you find coding errors, performance bottlenecks, or optimization opportunities.

[Renderer Process](#renderer-process)
-------------------------------------

The most comprehensive tool to debug individual renderer processes is the Chromium Developer Toolset. It is available for all renderer processes, including instances of `BrowserWindow`, `BrowserView`, and `WebView`. You can open them programmatically by calling the `openDevTools()` API on the `webContents` of the instance:

    const { BrowserWindow } = require('electron')
    
    let win = new BrowserWindow()
    win.webContents.openDevTools()

Google offers [excellent documentation for their developer tools](https://developer.chrome.com/devtools). We recommend that you make yourself familiar with them - they are usually one of the most powerful utilities in any Electron Developer's tool belt.

[Main Process](#main-process)
-----------------------------

Debugging the main process is a bit trickier, since you cannot open developer tools for them. The Chromium Developer Tools can [be used to debug Electron's main process](https://nodejs.org/en/docs/inspector/) thanks to a closer collaboration between Google / Chrome and Node.js, but you might encounter oddities like `require` not being present in the console.

For more information, see the [Debugging the Main Process documentation](/docs/tutorial/debugging-main-process).

* * *

[Application Distribution](#application-distribution)
=====================================================

To distribute your app with Electron, you need to package and rebrand it. The easiest way to do this is to use one of the following third party packaging tools:

*   [electron-forge](https://github.com/electron-userland/electron-forge)
*   [electron-builder](https://github.com/electron-userland/electron-builder)
*   [electron-packager](https://github.com/electron-userland/electron-packager)

These tools will take care of all the steps you need to take to end up with a distributable Electron applications, such as packaging your application, rebranding the executable, setting the right icons and optionally creating installers.

[Manual distribution](#manual-distribution)
-------------------------------------------

You can also choose to manually get your app ready for distribution. The steps needed to do this are outlined below.

To distribute your app with Electron, you need to download Electron's [prebuilt binaries](https://github.com/electron/electron/releases). Next, the folder containing your app should be named `app` and placed in Electron's resources directory as shown in the following examples. Note that the location of Electron's prebuilt binaries is indicated with `electron/` in the examples below.

On macOS:

    electron/Electron.app/Contents/Resources/app/
    ├── package.json
    ├── main.js
    └── index.html

On Windows and Linux:

    electron/resources/app
    ├── package.json
    ├── main.js
    └── index.html

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

[Packaging Your App into a File](#packaging-your-app-into-a-file)
-----------------------------------------------------------------

Apart from shipping your app by copying all of its source files, you can also package your app into an [asar](https://github.com/electron/asar) archive to avoid exposing your app's source code to users.

To use an `asar` archive to replace the `app` folder, you need to rename the archive to `app.asar`, and put it under Electron's resources directory like below, and Electron will then try to read the archive and start from it.

On macOS:

    electron/Electron.app/Contents/Resources/
    └── app.asar

On Windows and Linux:

    electron/resources/
    └── app.asar

More details can be found in [Application packaging](/docs/tutorial/application-packaging).

[Rebranding with Downloaded Binaries](#rebranding-with-downloaded-binaries)
---------------------------------------------------------------------------

After bundling your app into Electron, you will want to rebrand Electron before distributing it to users.

### [Windows](#windows)

You can rename `electron.exe` to any name you like, and edit its icon and other information with tools like [rcedit](https://github.com/atom/rcedit).

### [macOS](#macos)

You can rename `Electron.app` to any name you want, and you also have to rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in the following files:

*   `Electron.app/Contents/Info.plist`
*   `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

You can also rename the helper app to avoid showing `Electron Helper` in the Activity Monitor, but make sure you have renamed the helper app's executable file's name.

The structure of a renamed app would be like:

    MyApp.app/Contents
    ├── Info.plist
    ├── MacOS/
    │   └── MyApp
    └── Frameworks/
        └── MyApp Helper.app
            ├── Info.plist
            └── MacOS/
                └── MyApp Helper

### [Linux](#linux)

You can rename the `electron` executable to any name you like.

[Rebranding by Rebuilding Electron from Source](#rebranding-by-rebuilding-electron-from-source)
-----------------------------------------------------------------------------------------------

It is also possible to rebrand Electron by changing the product name and building it from source. To do this you need to set the build argument corresponding to the product name (`electron_product_name = "YourProductName"`) in the `args.gn` file and rebuild.

### [Creating a Custom Electron Fork](#creating-a-custom-electron-fork)

Creating a custom fork of Electron is almost certainly not something you will need to do in order to build your app, even for "Production Level" applications. Using a tool such as `electron-packager` or `electron-forge` will allow you to "Rebrand" Electron without having to do these steps.

You need to fork Electron when you have custom C++ code that you have patched directly into Electron, that either cannot be upstreamed, or has been rejected from the official version. As maintainers of Electron, we very much would like to make your scenario work, so please try as hard as you can to get your changes into the official version of Electron, it will be much much easier on you, and we appreciate your help.

#### [Creating a Custom Release with surf-build](#creating-a-custom-release-with-surf-build)

1.  Install [Surf](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`
    
2.  Create a new S3 bucket and create the following empty directory structure:
    
        - electron/
          - symbols/
          - dist/
    
3.  Set the following Environment Variables:
    

*   `ELECTRON_GITHUB_TOKEN` - a token that can create releases on GitHub
*   `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - the place where you'll upload Node.js headers as well as symbols
*   `ELECTRON_RELEASE` - Set to `true` and the upload part will run, leave unset and `surf-build` will do CI-type checks, appropriate to run for every pull request.
*   `CI` - Set to `true` or else it will fail
*   `GITHUB_TOKEN` - set it to the same as `ELECTRON_GITHUB_TOKEN`
*   `SURF_TEMP` - set to `C:\Temp` on Windows to prevent path too long issues
*   `TARGET_ARCH` - set to `ia32` or `x64`

4.  In `script/upload.py`, you _must_ set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.
    
5.  `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`
    
6.  Wait a very, very long time for the build to complete.
    

* * *

[Application Packaging](#application-packaging)
===============================================

To mitigate [issues](https://github.com/joyent/node/issues/6960) around long path names on Windows, slightly speed up `require` and conceal your source code from cursory inspection, you can choose to package your app into an [asar](https://github.com/electron/asar) archive with little changes to your source code.

Most users will get this feature for free, since it's supported out of the box by [`electron-packager`](https://github.com/electron-userland/electron-packager), [`electron-forge`](https://github.com/electron-userland/electron-forge), and [`electron-builder`](https://github.com/electron-userland/electron-builder). If you are not using any of these tools, read on.

[Generating `asar` Archives](#generating-asar-archives)
-------------------------------------------------------

An [asar](https://github.com/electron/asar) archive is a simple tar-like format that concatenates files into a single file. Electron can read arbitrary files from it without unpacking the whole file.

Steps to package your app into an `asar` archive:

### [1\. Install the asar Utility](#1-install-the-asar-utility)

    $ npm install -g asar

### [2\. Package with `asar pack`](#2-package-with-asar-pack)

    $ asar pack your-app app.asar

[Using `asar` Archives](#using-asar-archives)
---------------------------------------------

In Electron there are two sets of APIs: Node APIs provided by Node.js and Web APIs provided by Chromium. Both APIs support reading files from `asar` archives.

### [Node API](#node-api)

With special patches in Electron, Node APIs like `fs.readFile` and `require` treat `asar` archives as virtual directories, and the files in it as normal files in the filesystem.

For example, suppose we have an `example.asar` archive under `/path/to`:

    $ asar list /path/to/example.asar
    /app.js
    /file.txt
    /dir/module.js
    /static/index.html
    /static/main.css
    /static/jquery.min.js

Read a file in the `asar` archive:

    const fs = require('fs')
    fs.readFileSync('/path/to/example.asar/file.txt')

List all files under the root of the archive:

    const fs = require('fs')
    fs.readdirSync('/path/to/example.asar')

Use a module from the archive:

    require('/path/to/example.asar/dir/module.js')

You can also display a web page in an `asar` archive with `BrowserWindow`:

    const { BrowserWindow } = require('electron')
    const win = new BrowserWindow()
    
    win.loadURL('file:///path/to/example.asar/static/index.html')

### [Web API](#web-api)

In a web page, files in an archive can be requested with the `file:` protocol. Like the Node API, `asar` archives are treated as directories.

For example, to get a file with `$.get`:

    <script>
    let $ = require('./jquery.min.js')
    $.get('file:///path/to/example.asar/file.txt', (data) => {
      console.log(data)
    })
    </script>

### [Treating an `asar` Archive as a Normal File](#treating-an-asar-archive-as-a-normal-file)

For some cases like verifying the `asar` archive's checksum, we need to read the content of an `asar` archive as a file. For this purpose you can use the built-in `original-fs` module which provides original `fs` APIs without `asar` support:

    const originalFs = require('original-fs')
    originalFs.readFileSync('/path/to/example.asar')

You can also set `process.noAsar` to `true` to disable the support for `asar` in the `fs` module:

    const fs = require('fs')
    process.noAsar = true
    fs.readFileSync('/path/to/example.asar')

[Limitations of the Node API](#limitations-of-the-node-api)
-----------------------------------------------------------

Even though we tried hard to make `asar` archives in the Node API work like directories as much as possible, there are still limitations due to the low-level nature of the Node API.

### [Archives Are Read-only](#archives-are-read-only)

The archives can not be modified so all Node APIs that can modify files will not work with `asar` archives.

### [Working Directory Can Not Be Set to Directories in Archive](#working-directory-can-not-be-set-to-directories-in-archive)

Though `asar` archives are treated as directories, there are no actual directories in the filesystem, so you can never set the working directory to directories in `asar` archives. Passing them as the `cwd` option of some APIs will also cause errors.

### [Extra Unpacking on Some APIs](#extra-unpacking-on-some-apis)

Most `fs` APIs can read a file or get a file's information from `asar` archives without unpacking, but for some APIs that rely on passing the real file path to underlying system calls, Electron will extract the needed file into a temporary file and pass the path of the temporary file to the APIs to make them work. This adds a little overhead for those APIs.

APIs that requires extra unpacking are:

*   `child_process.execFile`
*   `child_process.execFileSync`
*   `fs.open`
*   `fs.openSync`
*   `process.dlopen` - Used by `require` on native modules

### [Fake Stat Information of `fs.stat`](#fake-stat-information-of-fsstat)

The `Stats` object returned by `fs.stat` and its friends on files in `asar` archives is generated by guessing, because those files do not exist on the filesystem. So you should not trust the `Stats` object except for getting file size and checking file type.

### [Executing Binaries Inside `asar` Archive](#executing-binaries-inside-asar-archive)

There are Node APIs that can execute binaries like `child_process.exec`, `child_process.spawn` and `child_process.execFile`, but only `execFile` is supported to execute binaries inside `asar` archive.

This is because `exec` and `spawn` accept `command` instead of `file` as input, and `command`s are executed under shell. There is no reliable way to determine whether a command uses a file in asar archive, and even if we do, we can not be sure whether we can replace the path in command without side effects.

[Adding Unpacked Files to `asar` Archives](#adding-unpacked-files-to-asar-archives)
-----------------------------------------------------------------------------------

As stated above, some Node APIs will unpack the file to the filesystem when called. Apart from the performance issues, various anti-virus scanners might be triggered by this behavior.

As a workaround, you can leave various files unpacked using the `--unpack` option. In the following example, shared libraries of native Node.js modules will not be packed:

    $ asar pack app app.asar --unpack *.node

After running the command, you will notice that a folder named `app.asar.unpacked` was created together with the `app.asar` file. It contains the unpacked files and should be shipped together with the `app.asar` archive.

* * *

[Technical Differences Between Electron and NW.js (formerly node-webkit)](#technical-differences-between-electron-and-nwjs-formerly-node-webkit)
================================================================================================================================================

**Note: Electron was previously named Atom Shell.**

Like NW.js, Electron provides a platform to write desktop applications with JavaScript and HTML and has Node integration to grant access to the low level system from web pages.

But there are also fundamental differences between the two projects that make Electron a completely separate product from NW.js:

**1\. Entry of Application**

In NW.js the main entry point of an application is a web page or a JS script. You specify a html or js file in the `package.json` and it is opened in a browser window as the application's main window (in case of an html entrypoint) or the script is executed.

In Electron, the entry point is a JavaScript script. Instead of providing a URL directly, you manually create a browser window and load an HTML file using the API. You also need to listen to window events to decide when to quit the application.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

**2\. Build System**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` is a single shared library that includes the Chromium Content module and all of its dependencies. Users don't need a powerful machine to build Electron.

**3\. Node Integration**

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the libuv loop with each platform's message loop to avoid hacking Chromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4\. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.

* * *

[autoUpdater](#autoupdater)
===========================

> Enable apps to automatically update themselves.

Process: [Main](/docs/glossary#main-process)

**See also: [A detailed guide about how to implement updates in your application](/docs/tutorial/updates).**

[Platform Notices](#platform-notices)
-------------------------------------

Currently, only macOS and Windows are supported. There is no built-in support for auto-updater on Linux, so it is recommended to use the distribution's package manager to update your app.

In addition, there are some subtle differences on each platform:

### [macOS](#macos)

On macOS, the `autoUpdater` module is built upon [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac), meaning you don't need any special setup to make it work. For server-side requirements, you can read [Server Support](https://github.com/Squirrel/Squirrel.Mac#server-support). Note that [App Transport Security](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html#//apple_ref/doc/uid/TP40009251-SW35) (ATS) applies to all requests made as part of the update process. Apps that need to disable ATS can add the `NSAllowsArbitraryLoads` key to their app's plist.

**Note:** Your application must be signed for automatic updates on macOS. This is a requirement of `Squirrel.Mac`.

### [Windows](#windows)

On Windows, you have to install your app into a user's machine before you can use the `autoUpdater`, so it is recommended that you use the [electron-winstaller](https://github.com/electron/windows-installer), [electron-forge](https://github.com/electron-userland/electron-forge) or the [grunt-electron-installer](https://github.com/electron/grunt-electron-installer) package to generate a Windows installer.

When using [electron-winstaller](https://github.com/electron/windows-installer) or [electron-forge](https://github.com/electron-userland/electron-forge) make sure you do not try to update your app [the first time it runs](https://github.com/electron/windows-installer#handling-squirrel-events) (Also see [this issue for more info](https://github.com/electron/electron/issues/7155)). It's also recommended to use [electron-squirrel-startup](https://github.com/mongodb-js/electron-squirrel-startup) to get desktop shortcuts for your app.

The installer generated with Squirrel will create a shortcut icon with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) in the format of `com.squirrel.PACKAGE_ID.YOUR_EXE_WITHOUT_DOT_EXE`, examples are `com.squirrel.slack.Slack` and `com.squirrel.code.Code`. You have to use the same ID for your app with `app.setAppUserModelId` API, otherwise Windows will not be able to pin your app properly in task bar.

Unlike Squirrel.Mac, Windows can host updates on S3 or any other static file host. You can read the documents of [Squirrel.Windows](https://github.com/Squirrel/Squirrel.Windows) to get more details about how Squirrel.Windows works.

[Events](#events)
-----------------

The `autoUpdater` object emits the following events:

### [Event: 'error'](#event-error)

Returns:

*   `error` Error

Emitted when there is an error while updating.

### [Event: 'checking-for-update'](#event-checking-for-update)

Emitted when checking if an update has started.

### [Event: 'update-available'](#event-update-available)

Emitted when there is an available update. The update is downloaded automatically.

### [Event: 'update-not-available'](#event-update-not-available)

Emitted when there is no available update.

### [Event: 'update-downloaded'](#event-update-downloaded)

Returns:

*   `event` Event
*   `releaseNotes` String
*   `releaseName` String
*   `releaseDate` Date
*   `updateURL` String

Emitted when an update has been downloaded.

On Windows only `releaseName` is available.

**Note:** It is not strictly necessary to handle this event. A successfully downloaded update will still be applied the next time the application starts.

### [Event: 'before-quit-for-update'](#event-before-quit-for-update)

This event is emitted after a user calls `quitAndInstall()`.

When this API is called, the `before-quit` event is not emitted before all windows are closed. As a result you should listen to this event if you wish to perform actions before the windows are closed while a process is quitting, as well as listening to `before-quit`.

[Methods](#methods)
-------------------

The `autoUpdater` object has the following methods:

### [`autoUpdater.setFeedURL(options)`](#autoupdatersetfeedurloptions)

*   `options` Object
    
    *   `url` String
    *   `headers` Object (optional) _macOS_ - HTTP request headers.
    *   `serverType` String (optional) _macOS_ - Either `json` or `default`, see the [Squirrel.Mac](https://github.com/Squirrel/Squirrel.Mac) README for more information.

Sets the `url` and initialize the auto updater.

### [`autoUpdater.getFeedURL()`](#autoupdatergetfeedurl)

Returns `String` - The current update feed URL.

### [`autoUpdater.checkForUpdates()`](#autoupdatercheckforupdates)

Asks the server whether there is an update. You must call `setFeedURL` before using this API.

### [`autoUpdater.quitAndInstall()`](#autoupdaterquitandinstall)

Restarts the app and installs the update after it has been downloaded. It should only be called after `update-downloaded` has been emitted.

Under the hood calling `autoUpdater.quitAndInstall()` will close all application windows first, and automatically call `app.quit()` after all windows have been closed.

**Note:** It is not strictly necessary to call this function to apply an update, as a successfully downloaded update will always be applied the next time the application starts.

* * *

[Automated Testing with a Custom Driver](#automated-testing-with-a-custom-driver)
=================================================================================

To write automated tests for your Electron app, you will need a way to "drive" your application. [Spectron](https://electronjs.org/spectron) is a commonly-used solution which lets you emulate user actions via [WebDriver](http://webdriver.io/). However, it's also possible to write your own custom driver using node's builtin IPC-over-STDIO. The benefit of a custom driver is that it tends to require less overhead than Spectron, and lets you expose custom methods to your test suite.

To create a custom driver, we'll use nodejs' [child\_process](https://nodejs.org/api/child_process.html) API. The test suite will spawn the Electron process, then establish a simple messaging protocol:

    var childProcess = require('child_process')
    var electronPath = require('electron')
    
    // spawn the process
    var env = { /* ... */ }
    var stdio = ['inherit', 'inherit', 'inherit', 'ipc']
    var appProcess = childProcess.spawn(electronPath, ['./app'], { stdio, env })
    
    // listen for IPC messages from the app
    appProcess.on('message', (msg) => {
      // ...
    })
    
    // send an IPC message to the app
    appProcess.send({ my: 'message' })

From within the Electron app, you can listen for messages and send replies using the nodejs [process](https://nodejs.org/api/process.html) API:

    // listen for IPC messages from the test suite
    process.on('message', (msg) => {
      // ...
    })
    
    // send an IPC message to the test suite
    process.send({ my: 'message' })

We can now communicate from the test suite to the Electron app using the `appProcess` object.

For convenience, you may want to wrap `appProcess` in a driver object that provides more high-level functions. Here is an example of how you can do this:

    class TestDriver {
      constructor ({ path, args, env }) {
        this.rpcCalls = []
    
        // start child process
        env.APP_TEST_DRIVER = 1 // let the app know it should listen for messages
        this.process = childProcess.spawn(path, args, { stdio: ['inherit', 'inherit', 'inherit', 'ipc'], env })
    
        // handle rpc responses
        this.process.on('message', (message) => {
          // pop the handler
          var rpcCall = this.rpcCalls[message.msgId]
          if (!rpcCall) return
          this.rpcCalls[message.msgId] = null
          // reject/resolve
          if (message.reject) rpcCall.reject(message.reject)
          else rpcCall.resolve(message.resolve)
        })
    
        // wait for ready
        this.isReady = this.rpc('isReady').catch((err) => {
          console.error('Application failed to start', err)
          this.stop()
          process.exit(1)
        })
      }
    
      // simple RPC call
      // to use: driver.rpc('method', 1, 2, 3).then(...)
      async rpc (cmd, ...args) {
        // send rpc request
        var msgId = this.rpcCalls.length
        this.process.send({ msgId, cmd, args })
        return new Promise((resolve, reject) => this.rpcCalls.push({ resolve, reject }))
      }
    
      stop () {
        this.process.kill()
      }
    }

In the app, you'd need to write a simple handler for the RPC calls:

    if (process.env.APP_TEST_DRIVER) {
      process.on('message', onMessage)
    }
    
    async function onMessage ({ msgId, cmd, args }) {
      var method = METHODS[cmd]
      if (!method) method = () => new Error('Invalid method: ' + cmd)
      try {
        var resolve = await method(...args)
        process.send({ msgId, resolve })
      } catch (err) {
        var reject = {
          message: err.message,
          stack: err.stack,
          name: err.name
        }
        process.send({ msgId, reject })
      }
    }
    
    const METHODS = {
      isReady () {
        // do any setup needed
        return true
      }
      // define your RPC-able methods here
    }

Then, in your test suite, you can use your test-driver as follows:

    var test = require('ava')
    var electronPath = require('electron')
    
    var app = new TestDriver({
      path: electronPath,
      args: ['./app'],
      env: {
        NODE_ENV: 'test'
      }
    })
    test.before(async t => {
      await app.isReady
    })
    test.after.always('cleanup', async t => {
      await app.stop()
    })

* * *

[BluetoothDevice Object](#bluetoothdevice-object)
=================================================

*   `deviceName` String
*   `deviceId` String

* * *

[Boilerplates and CLIs](#boilerplates-and-clis)
===============================================

Electron development is un-opinionated - there is no "one true way" to develop, build, package, or release an Electron application. Additional features for Electron, both for build- and run-time, can usually be found on [npm](https://www.npmjs.com/search?q=electron) in individual packages, allowing developers to build both the app and build pipeline they need.

That level of modularity and extendability ensures that all developers working with Electron, both big and small in team-size, are never restricted in what they can or cannot do at any time during their development lifecycle. However, for many developers, one of the community-driven boilerplates or command line tools might make it dramatically easier to compile, package, and release an app.

[Boilerplate vs CLI](#boilerplate-vs-cli)
-----------------------------------------

A boilerplate is only a starting point - a canvas, so to speak - from which you build your application. They usually come in the form of a repository you can clone and customize to your heart's content.

A command line tool on the other hand continues to support you throughout the development and release. They are more helpful and supportive but enforce guidelines on how your code should be structured and built. _Especially for beginners, using a command line tool is likely to be helpful_.

[electron-forge](#electron-forge)
---------------------------------

A "complete tool for building modern Electron applications". Electron Forge unifies the existing (and well maintained) build tools for Electron development into a cohesive package so that anyone can jump right in to Electron development.

Forge comes with [ready-to-use templates](https://electronforge.io/templates) for popular frameworks like React, Vue, or Angular. It uses the same core modules used by the greater Electron community (like [`electron-packager`](https://github.com/electron-userland/electron-packager)) –  changes made by Electron maintainers (like Slack) benefit Forge's users, too.

You can find more information and documentation on [electronforge.io](https://electronforge.io/).

[electron-builder](#electron-builder)
-------------------------------------

A "complete solution to package and build a ready-for-distribution Electron app" that focuses on an integrated experience. [`electron-builder`](https://github.com/electron-userland/electron-builder) adds one single dependency focused on simplicity and manages all further requirements internally.

`electron-builder` replaces features and modules used by the Electron maintainers (such as the auto-updater) with custom ones. They are generally tighter integrated but will have less in common with popular Electron apps like Atom, Visual Studio Code, or Slack.

You can find more information and documentation in [the repository](https://github.com/electron-userland/electron-builder).

[electron-react-boilerplate](#electron-react-boilerplate)
---------------------------------------------------------

If you don't want any tools but only a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. It's quite popular in the community and uses `electron-builder` internally.

[Other Tools and Boilerplates](#other-tools-and-boilerplates)
-------------------------------------------------------------

The ["Awesome Electron" list](https://github.com/sindresorhus/awesome-electron#boilerplates) contains more tools and boilerplates to choose from. If you find the length of the list intimidating, don't forget that adding tools as you go along is a valid approach, too.

* * *

[API Contract](#api-contract)
=============================

Breaking changes will be documented here, and deprecation warnings added to JS code where possible, at least [one major version](/docs/tutorial/electron-versioning#semver) before the change is made.

[`FIXME` comments](#fixme-comments)
===================================

The `FIXME` string is used in code comments to denote things that should be fixed for future releases. See [https://github.com/electron/electron/search?q=fixme](https://github.com/electron/electron/search?q=fixme)

[Planned Breaking API Changes (5.0)](#planned-breaking-api-changes-50)
======================================================================

[`new BrowserWindow({ webPreferences })`](#new-browserwindow-webpreferences-)
-----------------------------------------------------------------------------

The following `webPreferences` option default values are deprecated in favor of the new defaults listed below.

Property

Deprecated Default

New Default

`contextIsolation`

`false`

`true`

`nodeIntegration`

`true`

`false`

`webviewTag`

`nodeIntegration` if set else `true`

`false`

[`nativeWindowOpen`](#nativewindowopen)
---------------------------------------

Child windows opened with the `nativeWindowOpen` option will always have Node.js integration disabled.

[`webContents.findInPage(text[, options])`](#webcontentsfindinpagetext-options)
-------------------------------------------------------------------------------

`wordStart` and `medialCapitalAsWordStart` options are removed.

[Planned Breaking API Changes (4.0)](#planned-breaking-api-changes-40)
======================================================================

The following list includes the breaking API changes planned for Electron 4.0.

[`app.makeSingleInstance`](#appmakesingleinstance)
--------------------------------------------------

    // Deprecated
    app.makeSingleInstance(function (argv, cwd) {
    
    })
    // Replace with
    app.requestSingleInstanceLock()
    app.on('second-instance', function (event, argv, cwd) {
    
    })

[`app.releaseSingleInstance`](#appreleasesingleinstance)
--------------------------------------------------------

    // Deprecated
    app.releaseSingleInstance()
    // Replace with
    app.releaseSingleInstanceLock()

[`app.getGPUInfo`](#appgetgpuinfo)
----------------------------------

    app.getGPUInfo('complete')
    // Now behaves the same with `basic` on macOS
    app.getGPUInfo('basic')

[`win_delay_load_hook`](#win_delay_load_hook)
---------------------------------------------

When building native modules for windows, the `win_delay_load_hook` variable in the module's `binding.gyp` must be true (which is the default). If this hook is not present, then the native module will fail to load on Windows, with an error message like `Cannot find module`. See the [native module guide](/docs/tutorial/using-native-node-modules) for more.

[Breaking API Changes (3.0)](#breaking-api-changes-30)
======================================================

The following list includes the breaking API changes in Electron 3.0.

[`app`](#app)
-------------

    // Deprecated
    app.getAppMemoryInfo()
    // Replace with
    app.getAppMetrics()
    
    // Deprecated
    const metrics = app.getAppMetrics()
    const { memory } = metrics[0] // Deprecated property

[`BrowserWindow`](#browserwindow)
---------------------------------

    // Deprecated
    let optionsA = { webPreferences: { blinkFeatures: '' } }
    let windowA = new BrowserWindow(optionsA)
    // Replace with
    let optionsB = { webPreferences: { enableBlinkFeatures: '' } }
    let windowB = new BrowserWindow(optionsB)
    
    // Deprecated
    window.on('app-command', (e, cmd) => {
      if (cmd === 'media-play_pause') {
        // do something
      }
    })
    // Replace with
    window.on('app-command', (e, cmd) => {
      if (cmd === 'media-play-pause') {
        // do something
      }
    })

[`clipboard`](#clipboard)
-------------------------

    // Deprecated
    clipboard.readRtf()
    // Replace with
    clipboard.readRTF()
    
    // Deprecated
    clipboard.writeRtf()
    // Replace with
    clipboard.writeRTF()
    
    // Deprecated
    clipboard.readHtml()
    // Replace with
    clipboard.readHTML()
    
    // Deprecated
    clipboard.writeHtml()
    // Replace with
    clipboard.writeHTML()

[`crashReporter`](#crashreporter)
---------------------------------

    // Deprecated
    crashReporter.start({
      companyName: 'Crashly',
      submitURL: 'https://crash.server.com',
      autoSubmit: true
    })
    // Replace with
    crashReporter.start({
      companyName: 'Crashly',
      submitURL: 'https://crash.server.com',
      uploadToServer: true
    })

[`nativeImage`](#nativeimage)
-----------------------------

    // Deprecated
    nativeImage.createFromBuffer(buffer, 1.0)
    // Replace with
    nativeImage.createFromBuffer(buffer, {
      scaleFactor: 1.0
    })

[`process`](#process)
---------------------

    // Deprecated
    const info = process.getProcessMemoryInfo()

[`screen`](#screen)
-------------------

    // Deprecated
    screen.getMenuBarHeight()
    // Replace with
    screen.getPrimaryDisplay().workArea

[`session`](#session)
---------------------

    // Deprecated
    ses.setCertificateVerifyProc(function (hostname, certificate, callback) {
      callback(true)
    })
    // Replace with
    ses.setCertificateVerifyProc(function (request, callback) {
      callback(0)
    })

[`Tray`](#tray)
---------------

    // Deprecated
    tray.setHighlightMode(true)
    // Replace with
    tray.setHighlightMode('on')
    
    // Deprecated
    tray.setHighlightMode(false)
    // Replace with
    tray.setHighlightMode('off')

[`webContents`](#webcontents)
-----------------------------

    // Deprecated
    webContents.openDevTools({ detach: true })
    // Replace with
    webContents.openDevTools({ mode: 'detach' })
    
    // Removed
    webContents.setSize(options)
    // There is no replacement for this API

[`webFrame`](#webframe)
-----------------------

    // Deprecated
    webFrame.registerURLSchemeAsSecure('app')
    // Replace with
    protocol.registerStandardSchemes(['app'], { secure: true })
    
    // Deprecated
    webFrame.registerURLSchemeAsPrivileged('app', { secure: true })
    // Replace with
    protocol.registerStandardSchemes(['app'], { secure: true })

[`<webview>`](#webview)
-----------------------

    // Removed
    webview.setAttribute('disableguestresize', '')
    // There is no replacement for this API
    
    // Removed
    webview.setAttribute('guestinstance', instanceId)
    // There is no replacement for this API
    
    // Keyboard listeners no longer work on webview tag
    webview.onkeydown = () => { /* handler */ }
    webview.onkeyup = () => { /* handler */ }

[Node Headers URL](#node-headers-url)
-------------------------------------

This is the URL specified as `disturl` in a `.npmrc` file or as the `--dist-url` command line flag when building native Node modules.

Deprecated: [https://atom.io/download/atom-shell](https://atom.io/download/atom-shell)

Replace with: [https://atom.io/download/electron](https://atom.io/download/electron)

[Breaking API Changes (2.0)](#breaking-api-changes-20)
======================================================

The following list includes the breaking API changes made in Electron 2.0.

[`BrowserWindow`](#browserwindow)
---------------------------------

    // Deprecated
    let optionsA = { titleBarStyle: 'hidden-inset' }
    let windowA = new BrowserWindow(optionsA)
    // Replace with
    let optionsB = { titleBarStyle: 'hiddenInset' }
    let windowB = new BrowserWindow(optionsB)

[`menu`](#menu)
---------------

    // Removed
    menu.popup(browserWindow, 100, 200, 2)
    // Replaced with
    menu.popup(browserWindow, { x: 100, y: 200, positioningItem: 2 })

[`nativeImage`](#nativeimage)
-----------------------------

    // Removed
    nativeImage.toPng()
    // Replaced with
    nativeImage.toPNG()
    
    // Removed
    nativeImage.toJpeg()
    // Replaced with
    nativeImage.toJPEG()

[`process`](#process)
---------------------

*   `process.versions.electron` and `process.version.chrome` will be made read-only properties for consistency with the other `process.versions` properties set by Node.

[`webContents`](#webcontents)
-----------------------------

    // Removed
    webContents.setZoomLevelLimits(1, 2)
    // Replaced with
    webContents.setVisualZoomLevelLimits(1, 2)

[`webFrame`](#webframe)
-----------------------

    // Removed
    webFrame.setZoomLevelLimits(1, 2)
    // Replaced with
    webFrame.setVisualZoomLevelLimits(1, 2)

[`<webview>`](#webview)
-----------------------

    // Removed
    webview.setZoomLevelLimits(1, 2)
    // Replaced with
    webview.setVisualZoomLevelLimits(1, 2)

[Duplicate ARM Assets](#duplicate-arm-assets)
---------------------------------------------

Each Electron release includes two identical ARM builds with slightly different filenames, like `electron-v1.7.3-linux-arm.zip` and `electron-v1.7.3-linux-armv7l.zip`. The asset with the `v7l` prefix was added to clarify to users which ARM version it supports, and to disambiguate it from future armv6l and arm64 assets that may be produced.

The file _without the prefix_ is still being published to avoid breaking any setups that may be consuming it. Starting at 2.0, the un-prefixed file will no longer be published.

For details, see [6986](https://github.com/electron/electron/pull/6986) and [7189](https://github.com/electron/electron/pull/7189).

* * *

[Class: BrowserView](#class-browserview)
----------------------------------------

> Create and control views.

Process: [Main](/docs/glossary#main-process)

A `BrowserView` can be used to embed additional web content into a [`BrowserWindow`](/docs/api/browser-window). It is like a child window, except that it is positioned relative to its owning window. It is meant to be an alternative to the `webview` tag.

[Example](#example)
-------------------

    // In the main process.
    const { BrowserView, BrowserWindow } = require('electron')
    
    let win = new BrowserWindow({ width: 800, height: 600 })
    win.on('closed', () => {
      win = null
    })
    
    let view = new BrowserView({
      webPreferences: {
        nodeIntegration: false
      }
    })
    win.setBrowserView(view)
    view.setBounds({ x: 0, y: 0, width: 300, height: 300 })
    view.webContents.loadURL('https://electronjs.org')

### [`new BrowserView([options])` _Experimental_](#new-browserviewoptions-experimental)

*   `options` Object (optional)
    
    *   `webPreferences` Object (optional) - See [BrowserWindow](/docs/api/browser-window).

### [Static Methods](#static-methods)

#### [`BrowserView.getAllViews()`](#browserviewgetallviews)

Returns `BrowserView[]` - An array of all opened BrowserViews.

#### [`BrowserView.fromWebContents(webContents)`](#browserviewfromwebcontentswebcontents)

*   `webContents` [WebContents](/docs/api/web-contents)

Returns `BrowserView | null` - The BrowserView that owns the given `webContents` or `null` if the contents are not owned by a BrowserView.

#### [`BrowserView.fromId(id)`](#browserviewfromidid)

*   `id` Integer

Returns `BrowserView` - The view with the given `id`.

### [Instance Properties](#instance-properties)

Objects created with `new BrowserView` have the following properties:

#### [`view.webContents` _Experimental_](#viewwebcontents-experimental)

A [`WebContents`](/docs/api/web-contents) object owned by this view.

#### [`view.id` _Experimental_](#viewid-experimental)

A `Integer` representing the unique ID of the view.

### [Instance Methods](#instance-methods)

Objects created with `new BrowserView` have the following instance methods:

#### [`view.destroy()`](#viewdestroy)

Force closing the view, the `unload` and `beforeunload` events won't be emitted for the web page. After you're done with a view, call this function in order to free memory and other resources as soon as possible.

#### [`view.isDestroyed()`](#viewisdestroyed)

Returns `Boolean` - Whether the view is destroyed.

#### [`view.setAutoResize(options)` _Experimental_](#viewsetautoresizeoptions-experimental)

*   `options` Object
    
    *   `width` Boolean - If `true`, the view's width will grow and shrink together with the window. `false` by default.
    *   `height` Boolean - If `true`, the view's height will grow and shrink together with the window. `false` by default.

#### [`view.setBounds(bounds)` _Experimental_](#viewsetboundsbounds-experimental)

*   `bounds` [Rectangle](/docs/api/structures/rectangle)

Resizes and moves the view to the supplied bounds relative to the window.

#### [`view.setBackgroundColor(color)` _Experimental_](#viewsetbackgroundcolorcolor-experimental)

*   `color` String - Color in `#aarrggbb` or `#argb` form. The alpha channel is optional.

* * *

[BrowserWindow](#browserwindow)
===============================

> Create and control browser windows.

Process: [Main](/docs/glossary#main-process)

    // In the main process.
    const { BrowserWindow } = require('electron')
    
    // Or use `remote` from the renderer process.
    // const { BrowserWindow } = require('electron').remote
    
    let win = new BrowserWindow({ width: 800, height: 600 })
    win.on('closed', () => {
      win = null
    })
    
    // Load a remote URL
    win.loadURL('https://github.com')
    
    // Or load a local HTML file
    win.loadURL(`file://${__dirname}/app/index.html`)

[Frameless window](#frameless-window)
-------------------------------------

To create a window without chrome, or a transparent window in arbitrary shape, you can use the [Frameless Window](/docs/api/frameless-window) API.

[Showing window gracefully](#showing-window-gracefully)
-------------------------------------------------------

When loading a page in the window directly, users may see the page load incrementally, which is not a good experience for a native app. To make the window display without visual flash, there are two solutions for different situations.

### [Using `ready-to-show` event](#using-ready-to-show-event)

While loading the page, the `ready-to-show` event will be emitted when the renderer process has rendered the page for the first time if the window has not been shown yet. Showing the window after this event will have no visual flash:

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow({ show: false })
    win.once('ready-to-show', () => {
      win.show()
    })

This event is usually emitted after the `did-finish-load` event, but for pages with many remote resources, it may be emitted before the `did-finish-load` event.

### [Setting `backgroundColor`](#setting-backgroundcolor)

For a complex app, the `ready-to-show` event could be emitted too late, making the app feel slow. In this case, it is recommended to show the window immediately, and use a `backgroundColor` close to your app's background:

    const { BrowserWindow } = require('electron')
    
    let win = new BrowserWindow({ backgroundColor: '#2e2c29' })
    win.loadURL('https://github.com')

Note that even for apps that use `ready-to-show` event, it is still recommended to set `backgroundColor` to make app feel more native.

[Parent and child windows](#parent-and-child-windows)
-----------------------------------------------------

By using `parent` option, you can create child windows:

    const { BrowserWindow } = require('electron')
    
    let top = new BrowserWindow()
    let child = new BrowserWindow({ parent: top })
    child.show()
    top.show()

The `child` window will always show on top of the `top` window.

### [Modal windows](#modal-windows)

A modal window is a child window that disables parent window, to create a modal window, you have to set both `parent` and `modal` options:

    const { BrowserWindow } = require('electron')
    
    let child = new BrowserWindow({ parent: top, modal: true, show: false })
    child.loadURL('https://github.com')
    child.once('ready-to-show', () => {
      child.show()
    })

### [Page visibility](#page-visibility)

The [Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API) works as follows:

*   On all platforms, the visibility state tracks whether the window is hidden/minimized or not.
*   Additionally, on macOS, the visibility state also tracks the window occlusion state. If the window is occluded (i.e. fully covered) by another window, the visibility state will be `hidden`. On other platforms, the visibility state will be `hidden` only when the window is minimized or explicitly hidden with `win.hide()`.
*   If a `BrowserWindow` is created with `show: false`, the initial visibility state will be `visible` despite the window actually being hidden.
*   If `backgroundThrottling` is disabled, the visibility state will remain `visible` even if the window is minimized, occluded, or hidden.

It is recommended that you pause expensive operations when the visibility state is `hidden` in order to minimize power consumption.

### [Platform notices](#platform-notices)

*   On macOS modal windows will be displayed as sheets attached to the parent window.
*   On macOS the child windows will keep the relative position to parent window when parent window moves, while on Windows and Linux child windows will not move.
*   On Windows it is not supported to change parent window dynamically.
*   On Linux the type of modal windows will be changed to `dialog`.
*   On Linux many desktop environments do not support hiding a modal window.

[Class: BrowserWindow](#class-browserwindow)
--------------------------------------------

> Create and control browser windows.

Process: [Main](/docs/glossary#main-process)

`BrowserWindow` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

It creates a new `BrowserWindow` with native properties as set by the `options`.

### [`new BrowserWindow([options])`](#new-browserwindowoptions)

*   `options` Object (optional)
    
    *   `width` Integer (optional) - Window's width in pixels. Default is `800`.
    *   `height` Integer (optional) - Window's height in pixels. Default is `600`.
    *   `x` Integer (optional) (**required** if y is used) - Window's left offset from screen. Default is to center the window.
    *   `y` Integer (optional) (**required** if x is used) - Window's top offset from screen. Default is to center the window.
    *   `useContentSize` Boolean (optional) - The `width` and `height` would be used as web page's size, which means the actual window's size will include window frame's size and be slightly larger. Default is `false`.
    *   `center` Boolean (optional) - Show window in the center of the screen.
    *   `minWidth` Integer (optional) - Window's minimum width. Default is `0`.
    *   `minHeight` Integer (optional) - Window's minimum height. Default is `0`.
    *   `maxWidth` Integer (optional) - Window's maximum width. Default is no limit.
    *   `maxHeight` Integer (optional) - Window's maximum height. Default is no limit.
    *   `resizable` Boolean (optional) - Whether window is resizable. Default is `true`.
    *   `movable` Boolean (optional) - Whether window is movable. This is not implemented on Linux. Default is `true`.
    *   `minimizable` Boolean (optional) - Whether window is minimizable. This is not implemented on Linux. Default is `true`.
    *   `maximizable` Boolean (optional) - Whether window is maximizable. This is not implemented on Linux. Default is `true`.
    *   `closable` Boolean (optional) - Whether window is closable. This is not implemented on Linux. Default is `true`.
    *   `focusable` Boolean (optional) - Whether the window can be focused. Default is `true`. On Windows setting `focusable: false` also implies setting `skipTaskbar: true`. On Linux setting `focusable: false` makes the window stop interacting with wm, so the window will always stay on top in all workspaces.
    *   `alwaysOnTop` Boolean (optional) - Whether the window should always stay on top of other windows. Default is `false`.
    *   `fullscreen` Boolean (optional) - Whether the window should show in fullscreen. When explicitly set to `false` the fullscreen button will be hidden or disabled on macOS. Default is `false`.
    *   `fullscreenable` Boolean (optional) - Whether the window can be put into fullscreen mode. On macOS, also whether the maximize/zoom button should toggle full screen mode or maximize window. Default is `true`.
    *   `simpleFullscreen` Boolean (optional) - Use pre-Lion fullscreen on macOS. Default is `false`.
    *   `skipTaskbar` Boolean (optional) - Whether to show the window in taskbar. Default is `false`.
    *   `kiosk` Boolean (optional) - The kiosk mode. Default is `false`.
    *   `title` String (optional) - Default window title. Default is `"Electron"`.
    *   `icon` ([NativeImage](/docs/api/native-image) | String) (optional) - The window icon. On Windows it is recommended to use `ICO` icons to get best visual effects, you can also leave it undefined so the executable's icon will be used.
    *   `show` Boolean (optional) - Whether window should be shown when created. Default is `true`.
    *   `frame` Boolean (optional) - Specify `false` to create a [Frameless Window](/docs/api/frameless-window). Default is `true`.
    *   `parent` BrowserWindow (optional) - Specify parent window. Default is `null`.
    *   `modal` Boolean (optional) - Whether this is a modal window. This only works when the window is a child window. Default is `false`.
    *   `acceptFirstMouse` Boolean (optional) - Whether the web view accepts a single mouse-down event that simultaneously activates the window. Default is `false`.
    *   `disableAutoHideCursor` Boolean (optional) - Whether to hide cursor when typing. Default is `false`.
    *   `autoHideMenuBar` Boolean (optional) - Auto hide the menu bar unless the `Alt` key is pressed. Default is `false`.
    *   `enableLargerThanScreen` Boolean (optional) - Enable the window to be resized larger than screen. Default is `false`.
    *   `backgroundColor` String (optional) - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is set to `true`). Default is `#FFF` (white).
    *   `hasShadow` Boolean (optional) - Whether window should have a shadow. This is only implemented on macOS. Default is `true`.
    *   `opacity` Number (optional) - Set the initial opacity of the window, between 0.0 (fully transparent) and 1.0 (fully opaque). This is only implemented on Windows and macOS.
    *   `darkTheme` Boolean (optional) - Forces using dark theme for the window, only works on some GTK+3 desktop environments. Default is `false`.
    *   `transparent` Boolean (optional) - Makes the window [transparent](/docs/api/frameless-window). Default is `false`.
    *   `type` String (optional) - The type of window, default is normal window. See more about this below.
    *   `titleBarStyle` String (optional) - The style of window title bar. Default is `default`. Possible values are:
        
        *   `default` - Results in the standard gray opaque Mac title bar.
        *   `hidden` - Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls ("traffic lights") in the top left.
        *   `hiddenInset` - Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.
        *   `customButtonsOnHover` Boolean (optional) - Draw custom close, and minimize buttons on macOS frameless windows. These buttons will not display unless hovered over in the top left of the window. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. **Note:** This option is currently experimental.
    *   `fullscreenWindowTitle` Boolean (optional) - Shows the title in the title bar in full screen mode on macOS for all `titleBarStyle` options. Default is `false`.
    *   `thickFrame` Boolean (optional) - Use `WS_THICKFRAME` style for frameless windows on Windows, which adds standard window frame. Setting it to `false` will remove window shadow and window animations. Default is `true`.
    *   `vibrancy` String (optional) - Add a type of vibrancy effect to the window, only on macOS. Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. Please note that using `frame: false` in combination with a vibrancy value requires that you use a non-default `titleBarStyle` as well.
    *   `zoomToPageWidth` Boolean (optional) - Controls the behavior on macOS when option-clicking the green stoplight button on the toolbar or by clicking the Window > Zoom menu item. If `true`, the window will grow to the preferred width of the web page when zoomed, `false` will cause it to zoom to the width of the screen. This will also affect the behavior when calling `maximize()` directly. Default is `false`.
    *   `tabbingIdentifier` String (optional) - Tab group name, allows opening the window as a native tab on macOS 10.12+. Windows with the same tabbing identifier will be grouped together. This also adds a native new tab button to your window's tab bar and allows your `app` and window to receive the `new-window-for-tab` event.
    *   `webPreferences` Object (optional) - Settings of web page's features.
        
        *   `devTools` Boolean (optional) - Whether to enable DevTools. If it is set to `false`, can not use `BrowserWindow.webContents.openDevTools()` to open DevTools. Default is `true`.
        *   `nodeIntegration` Boolean (optional) - Whether node integration is enabled. Default is `true`.
        *   `nodeIntegrationInWorker` Boolean (optional) - Whether node integration is enabled in web workers. Default is `false`. More about this can be found in [Multithreading](/docs/tutorial/multithreading).
        *   `preload` String (optional) - Specifies a script that will be loaded before other scripts run in the page. This script will always have access to node APIs no matter whether node integration is turned on or off. The value should be the absolute file path to the script. When node integration is turned off, the preload script can reintroduce Node global symbols back to the global scope. See example [here](/docs/api/process#event-loaded).
        *   `sandbox` Boolean (optional) - If set, this will sandbox the renderer associated with the window, making it compatible with the Chromium OS-level sandbox and disabling the Node.js engine. This is not the same as the `nodeIntegration` option and the APIs available to the preload script are more limited. Read more about the option [here](/docs/api/sandbox-option). **Note:** This option is currently experimental and may change or be removed in future Electron releases.
        *   `enableRemoteModule` Boolean (optional) - Whether to enable the [`remote`](/docs/api/remote) module. Default is `true`.
        *   `session` [Session](/docs/api/session#class-session) (optional) - Sets the session used by the page. Instead of passing the Session object directly, you can also choose to use the `partition` option instead, which accepts a partition string. When both `session` and `partition` are provided, `session` will be preferred. Default is the default session.
        *   `partition` String (optional) - Sets the session used by the page according to the session's partition string. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. If there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. Default is the default session.
        *   `affinity` String (optional) - When specified, web pages with the same `affinity` will run in the same renderer process. Note that due to reusing the renderer process, certain `webPreferences` options will also be shared between the web pages even when you specified different values for them, including but not limited to `preload`, `sandbox` and `nodeIntegration`. So it is suggested to use exact same `webPreferences` for web pages with the same `affinity`. _This property is experimental_
        *   `zoomFactor` Number (optional) - The default zoom factor of the page, `3.0` represents `300%`. Default is `1.0`.
        *   `javascript` Boolean (optional) - Enables JavaScript support. Default is `true`.
        *   `webSecurity` Boolean (optional) - When `false`, it will disable the same-origin policy (usually using testing websites by people), and set `allowRunningInsecureContent` to `true` if this options has not been set by user. Default is `true`.
        *   `allowRunningInsecureContent` Boolean (optional) - Allow an https page to run JavaScript, CSS or plugins from http URLs. Default is `false`.
        *   `images` Boolean (optional) - Enables image support. Default is `true`.
        *   `textAreasAreResizable` Boolean (optional) - Make TextArea elements resizable. Default is `true`.
        *   `webgl` Boolean (optional) - Enables WebGL support. Default is `true`.
        *   `webaudio` Boolean (optional) - Enables WebAudio support. Default is `true`.
        *   `plugins` Boolean (optional) - Whether plugins should be enabled. Default is `false`.
        *   `experimentalFeatures` Boolean (optional) - Enables Chromium's experimental features. Default is `false`.
        *   `scrollBounce` Boolean (optional) - Enables scroll bounce (rubber banding) effect on macOS. Default is `false`.
        *   `enableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to enable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.
        *   `disableBlinkFeatures` String (optional) - A list of feature strings separated by `,`, like `CSSVariables,KeyboardEventKey` to disable. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.
        *   `defaultFontFamily` Object (optional) - Sets the default font for the font-family.
            
            *   `standard` String (optional) - Defaults to `Times New Roman`.
            *   `serif` String (optional) - Defaults to `Times New Roman`.
            *   `sansSerif` String (optional) - Defaults to `Arial`.
            *   `monospace` String (optional) - Defaults to `Courier New`.
            *   `cursive` String (optional) - Defaults to `Script`.
            *   `fantasy` String (optional) - Defaults to `Impact`.
        *   `defaultFontSize` Integer (optional) - Defaults to `16`.
        *   `defaultMonospaceFontSize` Integer (optional) - Defaults to `13`.
        *   `minimumFontSize` Integer (optional) - Defaults to `0`.
        *   `defaultEncoding` String (optional) - Defaults to `ISO-8859-1`.
        *   `backgroundThrottling` Boolean (optional) - Whether to throttle animations and timers when the page becomes background. This also affects the [Page Visibility API](#page-visibility). Defaults to `true`.
        *   `offscreen` Boolean (optional) - Whether to enable offscreen rendering for the browser window. Defaults to `false`. See the [offscreen rendering tutorial](/docs/tutorial/offscreen-rendering) for more details.
        *   `contextIsolation` Boolean (optional) - Whether to run Electron APIs and the specified `preload` script in a separate JavaScript context. Defaults to `false`. The context that the `preload` script runs in will still have full access to the `document` and `window` globals but it will use its own set of JavaScript builtins (`Array`, `Object`, `JSON`, etc.) and will be isolated from any changes made to the global environment by the loaded page. The Electron API will only be available in the `preload` script and not the loaded page. This option should be used when loading potentially untrusted remote content to ensure the loaded content cannot tamper with the `preload` script and any Electron APIs being used. This option uses the same technique used by [Chrome Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment). You can access this context in the dev tools by selecting the 'Electron Isolated Context' entry in the combo box at the top of the Console tab.
        *   `nativeWindowOpen` Boolean (optional) - Whether to use native `window.open()`. If set to `true`, the `webPreferences` of child window will always be the same with parent window, regardless of the parameters passed to `window.open()`. Defaults to `false`. **Note:** This option is currently experimental.
        *   `webviewTag` Boolean (optional) - Whether to enable the [`<webview>` tag](/docs/api/webview-tag). Defaults to the value of the `nodeIntegration` option. **Note:** The `preload` script configured for the `<webview>` will have node integration enabled when it is executed so you should ensure remote/untrusted content is not able to create a `<webview>` tag with a possibly malicious `preload` script. You can use the `will-attach-webview` event on [webContents](/docs/api/web-contents) to strip away the `preload` script and to validate or alter the `<webview>`'s initial settings.
        *   `additionalArguments` String[](/docs/api/optional) - A list of strings that will be appended to `process.argv` in the renderer process of this app. Useful for passing small bits of data down to renderer process preload scripts.
        *   `safeDialogs` Boolean (optional) - Whether to enable browser style consecutive dialog protection. Default is `false`.
        *   `safeDialogsMessage` String (optional) - The message to display when consecutive dialog protection is triggered. If not defined the default message would be used, note that currently the default message is in English and not localized.
        *   `navigateOnDragDrop` Boolean (optional) - Whether dragging and dropping a file or link onto the page causes a navigation. Default is `false`.

When setting minimum or maximum window size with `minWidth`/`maxWidth`/ `minHeight`/`maxHeight`, it only constrains the users. It won't prevent you from passing a size that does not follow size constraints to `setBounds`/`setSize` or to the constructor of `BrowserWindow`.

The possible values and behaviors of the `type` option are platform dependent. Possible values are:

*   On Linux, possible types are `desktop`, `dock`, `toolbar`, `splash`, `notification`.
*   On macOS, possible types are `desktop`, `textured`.
    
    *   The `textured` type adds metal gradient appearance (`NSTexturedBackgroundWindowMask`).
    *   The `desktop` type places the window at the desktop background window level (`kCGDesktopWindowLevel - 1`). Note that desktop window will not receive focus, keyboard or mouse events, but you can use `globalShortcut` to receive input sparingly.
*   On Windows, possible type is `toolbar`.

### [Instance Events](#instance-events)

Objects created with `new BrowserWindow` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### [Event: 'page-title-updated'](#event-page-title-updated)

Returns:

*   `event` Event
*   `title` String

Emitted when the document changed its title, calling `event.preventDefault()` will prevent the native window's title from changing.

#### [Event: 'close'](#event-close)

Returns:

*   `event` Event

Emitted when the window is going to be closed. It's emitted before the `beforeunload` and `unload` event of the DOM. Calling `event.preventDefault()` will cancel the close.

Usually you would want to use the `beforeunload` handler to decide whether the window should be closed, which will also be called when the window is reloaded. In Electron, returning any value other than `undefined` would cancel the close. For example:

    window.onbeforeunload = (e) => {
      console.log('I do not want to be closed')
    
      // Unlike usual browsers that a message box will be prompted to users, returning
      // a non-void value will silently cancel the close.
      // It is recommended to use the dialog API to let the user confirm closing the
      // application.
      e.returnValue = false // equivalent to `return false` but not recommended
    }

_**Note**: There is a subtle difference between the behaviors of `window.onbeforeunload = handler` and `window.addEventListener('beforeunload', handler)`. It is recommended to always set the `event.returnValue` explicitly, instead of only returning a value, as the former works more consistently within Electron._

#### [Event: 'closed'](#event-closed)

Emitted when the window is closed. After you have received this event you should remove the reference to the window and avoid using it any more.

#### [Event: 'session-end' _Windows_](#event-session-end-windows)

Emitted when window session is going to end due to force shutdown or machine restart or session log off.

#### [Event: 'unresponsive'](#event-unresponsive)

Emitted when the web page becomes unresponsive.

#### [Event: 'responsive'](#event-responsive)

Emitted when the unresponsive web page becomes responsive again.

#### [Event: 'blur'](#event-blur)

Emitted when the window loses focus.

#### [Event: 'focus'](#event-focus)

Emitted when the window gains focus.

#### [Event: 'show'](#event-show)

Emitted when the window is shown.

#### [Event: 'hide'](#event-hide)

Emitted when the window is hidden.

#### [Event: 'ready-to-show'](#event-ready-to-show)

Emitted when the web page has been rendered (while not being shown) and window can be displayed without a visual flash.

#### [Event: 'maximize'](#event-maximize)

Emitted when window is maximized.

#### [Event: 'unmaximize'](#event-unmaximize)

Emitted when the window exits from a maximized state.

#### [Event: 'minimize'](#event-minimize)

Emitted when the window is minimized.

#### [Event: 'restore'](#event-restore)

Emitted when the window is restored from a minimized state.

#### [Event: 'will-resize' _macOS_ _Windows_](#event-will-resize-macos-windows)

Returns:

*   `event` Event
*   `newBounds` [`Rectangle`](/docs/api/structures/rectangle) - Size the window is being resized to.

Emitted before the window is resized. Calling `event.preventDefault()` will prevent the window from being resized.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### [Event: 'resize'](#event-resize)

Emitted after the window has been resized.

#### [Event: 'will-move' _Windows_](#event-will-move-windows)

Returns:

*   `event` Event
*   `newBounds` [`Rectangle`](/docs/api/structures/rectangle) - Location the window is being moved to.

Emitted before the window is moved. Calling `event.preventDefault()` will prevent the window from being moved.

Note that this is only emitted when the window is being resized manually. Resizing the window with `setBounds`/`setSize` will not emit this event.

#### [Event: 'move'](#event-move)

Emitted when the window is being moved to a new position.

**Note**: On macOS this event is an alias of `moved`.

#### [Event: 'moved' _macOS_](#event-moved-macos)

Emitted once when the window is moved to a new position.

#### [Event: 'enter-full-screen'](#event-enter-full-screen)

Emitted when the window enters a full-screen state.

#### [Event: 'leave-full-screen'](#event-leave-full-screen)

Emitted when the window leaves a full-screen state.

#### [Event: 'enter-html-full-screen'](#event-enter-html-full-screen)

Emitted when the window enters a full-screen state triggered by HTML API.

#### [Event: 'leave-html-full-screen'](#event-leave-html-full-screen)

Emitted when the window leaves a full-screen state triggered by HTML API.

#### [Event: 'always-on-top-changed' _macOS_](#event-always-on-top-changed-macos)

Returns:

*   `event` Event
*   `isAlwaysOnTop` Boolean

Emitted when the window is set or unset to show always on top of other windows.

#### [Event: 'app-command' _Windows_](#event-app-command-windows)

Returns:

*   `event` Event
*   `command` String

Emitted when an [App Command](https://msdn.microsoft.com/en-us/library/windows/desktop/ms646275(v=vs.85).aspx) is invoked. These are typically related to keyboard media keys or browser commands, as well as the "Back" button built into some mice on Windows.

Commands are lowercased, underscores are replaced with hyphens, and the `APPCOMMAND_` prefix is stripped off. e.g. `APPCOMMAND_BROWSER_BACKWARD` is emitted as `browser-backward`.

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow()
    win.on('app-command', (e, cmd) => {
      // Navigate the window back when the user hits their mouse back button
      if (cmd === 'browser-backward' && win.webContents.canGoBack()) {
        win.webContents.goBack()
      }
    })

#### [Event: 'scroll-touch-begin' _macOS_](#event-scroll-touch-begin-macos)

Emitted when scroll wheel event phase has begun.

#### [Event: 'scroll-touch-end' _macOS_](#event-scroll-touch-end-macos)

Emitted when scroll wheel event phase has ended.

#### [Event: 'scroll-touch-edge' _macOS_](#event-scroll-touch-edge-macos)

Emitted when scroll wheel event phase filed upon reaching the edge of element.

#### [Event: 'swipe' _macOS_](#event-swipe-macos)

Returns:

*   `event` Event
*   `direction` String

Emitted on 3-finger swipe. Possible directions are `up`, `right`, `down`, `left`.

#### [Event: 'sheet-begin' _macOS_](#event-sheet-begin-macos)

Emitted when the window opens a sheet.

#### [Event: 'sheet-end' _macOS_](#event-sheet-end-macos)

Emitted when the window has closed a sheet.

#### [Event: 'new-window-for-tab' _macOS_](#event-new-window-for-tab-macos)

Emitted when the native new tab button is clicked.

### [Static Methods](#static-methods)

The `BrowserWindow` class has the following static methods:

#### [`BrowserWindow.getAllWindows()`](#browserwindowgetallwindows)

Returns `BrowserWindow[]` - An array of all opened browser windows.

#### [`BrowserWindow.getFocusedWindow()`](#browserwindowgetfocusedwindow)

Returns `BrowserWindow | null` - The window that is focused in this application, otherwise returns `null`.

#### [`BrowserWindow.fromWebContents(webContents)`](#browserwindowfromwebcontentswebcontents)

*   `webContents` [WebContents](/docs/api/web-contents)

Returns `BrowserWindow` - The window that owns the given `webContents`.

#### [`BrowserWindow.fromBrowserView(browserView)`](#browserwindowfrombrowserviewbrowserview)

*   `browserView` [BrowserView](/docs/api/browser-view)

Returns `BrowserWindow | null` - The window that owns the given `browserView`. If the given view is not attached to any window, returns `null`.

#### [`BrowserWindow.fromId(id)`](#browserwindowfromidid)

*   `id` Integer

Returns `BrowserWindow` - The window with the given `id`.

#### [`BrowserWindow.addExtension(path)`](#browserwindowaddextensionpath)

*   `path` String

Adds Chrome extension located at `path`, and returns extension's name.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### [`BrowserWindow.removeExtension(name)`](#browserwindowremoveextensionname)

*   `name` String

Remove a Chrome extension by name.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### [`BrowserWindow.getExtensions()`](#browserwindowgetextensions)

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### [`BrowserWindow.addDevToolsExtension(path)`](#browserwindowadddevtoolsextensionpath)

*   `path` String

Adds DevTools extension located at `path`, and returns extension's name.

The extension will be remembered so you only need to call this API once, this API is not for programming use. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

The method will also not return if the extension's manifest is missing or incomplete.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### [`BrowserWindow.removeDevToolsExtension(name)`](#browserwindowremovedevtoolsextensionname)

*   `name` String

Remove a DevTools extension by name.

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

#### [`BrowserWindow.getDevToolsExtensions()`](#browserwindowgetdevtoolsextensions)

Returns `Object` - The keys are the extension names and each value is an Object containing `name` and `version` properties.

To check if a DevTools extension is installed you can run the following:

    const { BrowserWindow } = require('electron')
    
    let installed = BrowserWindow.getDevToolsExtensions().hasOwnProperty('devtron')
    console.log(installed)

**Note:** This API cannot be called before the `ready` event of the `app` module is emitted.

### [Instance Properties](#instance-properties)

Objects created with `new BrowserWindow` have the following properties:

    const { BrowserWindow } = require('electron')
    // In this example `win` is our instance
    let win = new BrowserWindow({ width: 800, height: 600 })
    win.loadURL('https://github.com')

#### [`win.webContents`](#winwebcontents)

A `WebContents` object this window owns. All web page related events and operations will be done via it.

See the [`webContents` documentation](/docs/api/web-contents) for its methods and events.

#### [`win.id`](#winid)

A `Integer` representing the unique ID of the window.

### [Instance Methods](#instance-methods)

Objects created with `new BrowserWindow` have the following instance methods:

**Note:** Some methods are only available on specific operating systems and are labeled as such.

#### [`win.destroy()`](#windestroy)

Force closing the window, the `unload` and `beforeunload` event won't be emitted for the web page, and `close` event will also not be emitted for this window, but it guarantees the `closed` event will be emitted.

#### [`win.close()`](#winclose)

Try to close the window. This has the same effect as a user manually clicking the close button of the window. The web page may cancel the close though. See the [close event](#event-close).

#### [`win.focus()`](#winfocus)

Focuses on the window.

#### [`win.blur()`](#winblur)

Removes focus from the window.

#### [`win.isFocused()`](#winisfocused)

Returns `Boolean` - Whether the window is focused.

#### [`win.isDestroyed()`](#winisdestroyed)

Returns `Boolean` - Whether the window is destroyed.

#### [`win.show()`](#winshow)

Shows and gives focus to the window.

#### [`win.showInactive()`](#winshowinactive)

Shows the window but doesn't focus on it.

#### [`win.hide()`](#winhide)

Hides the window.

#### [`win.isVisible()`](#winisvisible)

Returns `Boolean` - Whether the window is visible to the user.

#### [`win.isModal()`](#winismodal)

Returns `Boolean` - Whether current window is a modal window.

#### [`win.maximize()`](#winmaximize)

Maximizes the window. This will also show (but not focus) the window if it isn't being displayed already.

#### [`win.unmaximize()`](#winunmaximize)

Unmaximizes the window.

#### [`win.isMaximized()`](#winismaximized)

Returns `Boolean` - Whether the window is maximized.

#### [`win.minimize()`](#winminimize)

Minimizes the window. On some platforms the minimized window will be shown in the Dock.

#### [`win.restore()`](#winrestore)

Restores the window from minimized state to its previous state.

#### [`win.isMinimized()`](#winisminimized)

Returns `Boolean` - Whether the window is minimized.

#### [`win.setFullScreen(flag)`](#winsetfullscreenflag)

*   `flag` Boolean

Sets whether the window should be in fullscreen mode.

#### [`win.isFullScreen()`](#winisfullscreen)

Returns `Boolean` - Whether the window is in fullscreen mode.

#### [`win.setSimpleFullScreen(flag)` _macOS_](#winsetsimplefullscreenflag-macos)

*   `flag` Boolean

Enters or leaves simple fullscreen mode.

Simple fullscreen mode emulates the native fullscreen behavior found in versions of Mac OS X prior to Lion (10.7).

#### [`win.isSimpleFullScreen()` _macOS_](#winissimplefullscreen-macos)

Returns `Boolean` - Whether the window is in simple (pre-Lion) fullscreen mode.

#### [`win.isNormal()`](#winisnormal)

Returns `Boolean` - Whether the window is in normal state (not maximized, not minimized, not in fullscreen mode).

#### [`win.setAspectRatio(aspectRatio[, extraSize])` _macOS_](#winsetaspectratioaspectratio-extrasize-macos)

*   `aspectRatio` Float - The aspect ratio to maintain for some portion of the content view.
*   `extraSize` [Size](/docs/api/structures/size) - The extra size not to be included while maintaining the aspect ratio.

This will make a window maintain an aspect ratio. The extra size allows a developer to have space, specified in pixels, not included within the aspect ratio calculations. This API already takes into account the difference between a window's size and its content size.

Consider a normal window with an HD video player and associated controls. Perhaps there are 15 pixels of controls on the left edge, 25 pixels of controls on the right edge and 50 pixels of controls below the player. In order to maintain a 16:9 aspect ratio (standard aspect ratio for HD @1920x1080) within the player itself we would call this function with arguments of 16/9 and \[ 40, 50 \]. The second argument doesn't care where the extra width and height are within the content view--only that they exist. Sum any extra width and height areas you have within the overall content view.

Calling this function with a value of `0` will remove any previously set aspect ratios.

#### [`win.setBackgroundColor(backgroundColor)`](#winsetbackgroundcolorbackgroundcolor)

*   `backgroundColor` String - Window's background color as a hexadecimal value, like `#66CD00` or `#FFF` or `#80FFFFFF` (alpha is supported if `transparent` is `true`). Default is `#FFF` (white).

Sets the background color of the window. See [Setting `backgroundColor`](#setting-backgroundcolor).

#### [`win.previewFile(path[, displayName])` _macOS_](#winpreviewfilepath-displayname-macos)

*   `path` String - The absolute path to the file to preview with QuickLook. This is important as Quick Look uses the file name and file extension on the path to determine the content type of the file to open.
*   `displayName` String (optional) - The name of the file to display on the Quick Look modal view. This is purely visual and does not affect the content type of the file. Defaults to `path`.

Uses [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) to preview a file at a given path.

#### [`win.closeFilePreview()` _macOS_](#winclosefilepreview-macos)

Closes the currently open [Quick Look](https://en.wikipedia.org/wiki/Quick_Look) panel.

#### [`win.setBounds(bounds[, animate])`](#winsetboundsbounds-animate)

*   `bounds` [Rectangle](/docs/api/structures/rectangle)
*   `animate` Boolean (optional) _macOS_

Resizes and moves the window to the supplied bounds. Any properties that are not supplied will default to their current values.

    const { BrowserWindow } = require('electron')
    const win = new BrowserWindow()
     // set all bounds properties
    win.setBounds({ x: 440, y: 225, width: 800, height: 600 })
     // set a single bounds property
    win.setBounds({ width: 200 })
     // { x: 440, y: 225, width: 200, height: 600 }
    console.log(win.getBounds())

#### [`win.getBounds()`](#wingetbounds)

Returns [`Rectangle`](/docs/api/structures/rectangle)

#### [`win.setContentBounds(bounds[, animate])`](#winsetcontentboundsbounds-animate)

*   `bounds` [Rectangle](/docs/api/structures/rectangle)
*   `animate` Boolean (optional) _macOS_

Resizes and moves the window's client area (e.g. the web page) to the supplied bounds.

#### [`win.getContentBounds()`](#wingetcontentbounds)

Returns [`Rectangle`](/docs/api/structures/rectangle)

#### [`win.getNormalBounds()`](#wingetnormalbounds)

Returns [`Rectangle`](/docs/api/structures/rectangle) - Contains the window bounds of the normal state

**Note:** whatever the current state of the window : maximized, minimized or in fullscreen, this function always returns the position and size of the window in normal state. In normal state, getBounds and getNormalBounds returns the same [`Rectangle`](/docs/api/structures/rectangle).

#### [`win.setEnabled(enable)`](#winsetenabledenable)

*   `enable` Boolean

Disable or enable the window.

#### [`win.setSize(width, height[, animate])`](#winsetsizewidth-height-animate)

*   `width` Integer
*   `height` Integer
*   `animate` Boolean (optional) _macOS_

Resizes the window to `width` and `height`. If `width` or `height` are below any set minimum size constraints the window will snap to its minimum size.

#### [`win.getSize()`](#wingetsize)

Returns `Integer[]` - Contains the window's width and height.

#### [`win.setContentSize(width, height[, animate])`](#winsetcontentsizewidth-height-animate)

*   `width` Integer
*   `height` Integer
*   `animate` Boolean (optional) _macOS_

Resizes the window's client area (e.g. the web page) to `width` and `height`.

#### [`win.getContentSize()`](#wingetcontentsize)

Returns `Integer[]` - Contains the window's client area's width and height.

#### [`win.setMinimumSize(width, height)`](#winsetminimumsizewidth-height)

*   `width` Integer
*   `height` Integer

Sets the minimum size of window to `width` and `height`.

#### [`win.getMinimumSize()`](#wingetminimumsize)

Returns `Integer[]` - Contains the window's minimum width and height.

#### [`win.setMaximumSize(width, height)`](#winsetmaximumsizewidth-height)

*   `width` Integer
*   `height` Integer

Sets the maximum size of window to `width` and `height`.

#### [`win.getMaximumSize()`](#wingetmaximumsize)

Returns `Integer[]` - Contains the window's maximum width and height.

#### [`win.setResizable(resizable)`](#winsetresizableresizable)

*   `resizable` Boolean

Sets whether the window can be manually resized by user.

#### [`win.isResizable()`](#winisresizable)

Returns `Boolean` - Whether the window can be manually resized by user.

#### [`win.setMovable(movable)` _macOS_ _Windows_](#winsetmovablemovable-macos-windows)

*   `movable` Boolean

Sets whether the window can be moved by user. On Linux does nothing.

#### [`win.isMovable()` _macOS_ _Windows_](#winismovable-macos-windows)

Returns `Boolean` - Whether the window can be moved by user.

On Linux always returns `true`.

#### [`win.setMinimizable(minimizable)` _macOS_ _Windows_](#winsetminimizableminimizable-macos-windows)

*   `minimizable` Boolean

Sets whether the window can be manually minimized by user. On Linux does nothing.

#### [`win.isMinimizable()` _macOS_ _Windows_](#winisminimizable-macos-windows)

Returns `Boolean` - Whether the window can be manually minimized by user

On Linux always returns `true`.

#### [`win.setMaximizable(maximizable)` _macOS_ _Windows_](#winsetmaximizablemaximizable-macos-windows)

*   `maximizable` Boolean

Sets whether the window can be manually maximized by user. On Linux does nothing.

#### [`win.isMaximizable()` _macOS_ _Windows_](#winismaximizable-macos-windows)

Returns `Boolean` - Whether the window can be manually maximized by user.

On Linux always returns `true`.

#### [`win.setFullScreenable(fullscreenable)`](#winsetfullscreenablefullscreenable)

*   `fullscreenable` Boolean

Sets whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### [`win.isFullScreenable()`](#winisfullscreenable)

Returns `Boolean` - Whether the maximize/zoom window button toggles fullscreen mode or maximizes the window.

#### [`win.setClosable(closable)` _macOS_ _Windows_](#winsetclosableclosable-macos-windows)

*   `closable` Boolean

Sets whether the window can be manually closed by user. On Linux does nothing.

#### [`win.isClosable()` _macOS_ _Windows_](#winisclosable-macos-windows)

Returns `Boolean` - Whether the window can be manually closed by user.

On Linux always returns `true`.

#### [`win.setAlwaysOnTop(flag[, level][, relativeLevel])`](#winsetalwaysontopflag-level-relativelevel)

*   `flag` Boolean
*   `level` String (optional) _macOS_ - Values include `normal`, `floating`, `torn-off-menu`, `modal-panel`, `main-menu`, `status`, `pop-up-menu`, `screen-saver`, and `dock` (Deprecated). The default is `floating`. See the [macOS docs](https://developer.apple.com/documentation/appkit/nswindow/level) for more details.
*   `relativeLevel` Integer (optional) _macOS_ - The number of layers higher to set this window relative to the given `level`. The default is `0`. Note that Apple discourages setting levels higher than 1 above `screen-saver`.

Sets whether the window should show always on top of other windows. After setting this, the window is still a normal window, not a toolbox window which can not be focused on.

#### [`win.isAlwaysOnTop()`](#winisalwaysontop)

Returns `Boolean` - Whether the window is always on top of other windows.

#### [`win.moveTop()` _macOS_ _Windows_](#winmovetop-macos-windows)

Moves window to top(z-order) regardless of focus

#### [`win.center()`](#wincenter)

Moves window to the center of the screen.

#### [`win.setPosition(x, y[, animate])`](#winsetpositionx-y-animate)

*   `x` Integer
*   `y` Integer
*   `animate` Boolean (optional) _macOS_

Moves window to `x` and `y`.

#### [`win.getPosition()`](#wingetposition)

Returns `Integer[]` - Contains the window's current position.

#### [`win.setTitle(title)`](#winsettitletitle)

*   `title` String

Changes the title of native window to `title`.

#### [`win.getTitle()`](#wingettitle)

Returns `String` - The title of the native window.

**Note:** The title of web page can be different from the title of the native window.

#### [`win.setSheetOffset(offsetY[, offsetX])` _macOS_](#winsetsheetoffsetoffsety-offsetx-macos)

*   `offsetY` Float
*   `offsetX` Float (optional)

Changes the attachment point for sheets on macOS. By default, sheets are attached just below the window frame, but you may want to display them beneath a HTML-rendered toolbar. For example:

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow()
    
    let toolbarRect = document.getElementById('toolbar').getBoundingClientRect()
    win.setSheetOffset(toolbarRect.height)

#### [`win.flashFrame(flag)`](#winflashframeflag)

*   `flag` Boolean

Starts or stops flashing the window to attract user's attention.

#### [`win.setSkipTaskbar(skip)`](#winsetskiptaskbarskip)

*   `skip` Boolean

Makes the window not show in the taskbar.

#### [`win.setKiosk(flag)`](#winsetkioskflag)

*   `flag` Boolean

Enters or leaves the kiosk mode.

#### [`win.isKiosk()`](#winiskiosk)

Returns `Boolean` - Whether the window is in kiosk mode.

#### [`win.getNativeWindowHandle()`](#wingetnativewindowhandle)

Returns `Buffer` - The platform-specific handle of the window.

The native type of the handle is `HWND` on Windows, `NSView*` on macOS, and `Window` (`unsigned long`) on Linux.

#### [`win.hookWindowMessage(message, callback)` _Windows_](#winhookwindowmessagemessage-callback-windows)

*   `message` Integer
*   `callback` Function

Hooks a windows message. The `callback` is called when the message is received in the WndProc.

#### [`win.isWindowMessageHooked(message)` _Windows_](#winiswindowmessagehookedmessage-windows)

*   `message` Integer

Returns `Boolean` - `true` or `false` depending on whether the message is hooked.

#### [`win.unhookWindowMessage(message)` _Windows_](#winunhookwindowmessagemessage-windows)

*   `message` Integer

Unhook the window message.

#### [`win.unhookAllWindowMessages()` _Windows_](#winunhookallwindowmessages-windows)

Unhooks all of the window messages.

#### [`win.setRepresentedFilename(filename)` _macOS_](#winsetrepresentedfilenamefilename-macos)

*   `filename` String

Sets the pathname of the file the window represents, and the icon of the file will show in window's title bar.

#### [`win.getRepresentedFilename()` _macOS_](#wingetrepresentedfilename-macos)

Returns `String` - The pathname of the file the window represents.

#### [`win.setDocumentEdited(edited)` _macOS_](#winsetdocumenteditededited-macos)

*   `edited` Boolean

Specifies whether the window’s document has been edited, and the icon in title bar will become gray when set to `true`.

#### [`win.isDocumentEdited()` _macOS_](#winisdocumentedited-macos)

Returns `Boolean` - Whether the window's document has been edited.

#### [`win.focusOnWebView()`](#winfocusonwebview)

#### [`win.blurWebView()`](#winblurwebview)

#### [`win.capturePage([rect, ]callback)`](#wincapturepagerect-callback)

*   `rect` [Rectangle](/docs/api/structures/rectangle) (optional) - The bounds to capture
*   `callback` Function
    
    *   `image` [NativeImage](/docs/api/native-image)

Same as `webContents.capturePage([rect, ]callback)`.

#### [`win.loadURL(url[, options])`](#winloadurlurl-options)

*   `url` String
*   `options` Object (optional)
    
    *   `httpReferrer` (String | [Referrer](/docs/api/structures/referrer)) (optional) - An HTTP Referrer url.
    *   `userAgent` String (optional) - A user agent originating the request.
    *   `extraHeaders` String (optional) - Extra headers separated by "\\n"
    *   `postData` ([UploadRawData\[\]](/docs/api/structures/upload-raw-data) | [UploadFile\[\]](/docs/api/structures/upload-file) | [UploadBlob\[\]](/docs/api/structures/upload-blob)) (optional)
    *   `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Same as `webContents.loadURL(url[, options])`.

The `url` can be a remote address (e.g. `http://`) or a path to a local HTML file using the `file://` protocol.

To ensure that file URLs are properly formatted, it is recommended to use Node's [`url.format`](https://nodejs.org/api/url.html#url_url_format_urlobject) method:

    let url = require('url').format({
      protocol: 'file',
      slashes: true,
      pathname: require('path').join(__dirname, 'index.html')
    })
    
    win.loadURL(url)

You can load a URL using a `POST` request with URL-encoded data by doing the following:

    win.loadURL('http://localhost:8000/post', {
      postData: [{
        type: 'rawData',
        bytes: Buffer.from('hello=world')
      }],
      extraHeaders: 'Content-Type: application/x-www-form-urlencoded'
    })

#### [`win.loadFile(filePath[, options])`](#winloadfilefilepath-options)

*   `filePath` String
*   `options` Object (optional)
    
    *   `query` Object (optional) - Passed to `url.format()`.
    *   `search` String (optional) - Passed to `url.format()`.
    *   `hash` String (optional) - Passed to `url.format()`.

Same as `webContents.loadFile`, `filePath` should be a path to an HTML file relative to the root of your application. See the `webContents` docs for more information.

#### [`win.reload()`](#winreload)

Same as `webContents.reload`.

#### [`win.setMenu(menu)` _Linux_ _Windows_](#winsetmenumenu-linux-windows)

*   `menu` Menu | null

Sets the `menu` as the window's menu bar, setting it to `null` will remove the menu bar.

#### [`win.setProgressBar(progress[, options])`](#winsetprogressbarprogress-options)

*   `progress` Double
*   `options` Object (optional)
    
    *   `mode` String _Windows_ - Mode for the progress bar. Can be `none`, `normal`, `indeterminate`, `error` or `paused`.

Sets progress value in progress bar. Valid range is \[0, 1.0\].

Remove progress bar when progress < 0; Change to indeterminate mode when progress > 1.

On Linux platform, only supports Unity desktop environment, you need to specify the `*.desktop` file name to `desktopName` field in `package.json`. By default, it will assume `app.getName().desktop`.

On Windows, a mode can be passed. Accepted values are `none`, `normal`, `indeterminate`, `error`, and `paused`. If you call `setProgressBar` without a mode set (but with a value within the valid range), `normal` will be assumed.

#### [`win.setOverlayIcon(overlay, description)` _Windows_](#winsetoverlayiconoverlay-description-windows)

*   `overlay` [NativeImage](/docs/api/native-image) | null - the icon to display on the bottom right corner of the taskbar icon. If this parameter is `null`, the overlay is cleared
*   `description` String - a description that will be provided to Accessibility screen readers

Sets a 16 x 16 pixel overlay onto the current taskbar icon, usually used to convey some sort of application status or to passively notify the user.

#### [`win.setHasShadow(hasShadow)` _macOS_](#winsethasshadowhasshadow-macos)

*   `hasShadow` Boolean

Sets whether the window should have a shadow. On Windows and Linux does nothing.

#### [`win.hasShadow()` _macOS_](#winhasshadow-macos)

Returns `Boolean` - Whether the window has a shadow.

On Windows and Linux always returns `true`.

#### [`win.setOpacity(opacity)` _Windows_ _macOS_](#winsetopacityopacity-windows-macos)

*   `opacity` Number - between 0.0 (fully transparent) and 1.0 (fully opaque)

Sets the opacity of the window. On Linux does nothing.

#### [`win.getOpacity()` _Windows_ _macOS_](#wingetopacity-windows-macos)

Returns `Number` - between 0.0 (fully transparent) and 1.0 (fully opaque)

#### [`win.setShape(rects)` _Windows_ _Linux_ _Experimental_](#winsetshaperects-windows-linux-experimental)

*   `rects` [Rectangle\[\]](/docs/api/structures/rectangle) - Sets a shape on the window. Passing an empty list reverts the window to being rectangular.

Setting a window shape determines the area within the window where the system permits drawing and user interaction. Outside of the given region, no pixels will be drawn and no mouse events will be registered. Mouse events outside of the region will not be received by that window, but will fall through to whatever is behind the window.

#### [`win.setThumbarButtons(buttons)` _Windows_](#winsetthumbarbuttonsbuttons-windows)

*   `buttons` [ThumbarButton\[\]](/docs/api/structures/thumbar-button)

Returns `Boolean` - Whether the buttons were added successfully

Add a thumbnail toolbar with a specified set of buttons to the thumbnail image of a window in a taskbar button layout. Returns a `Boolean` object indicates whether the thumbnail has been added successfully.

The number of buttons in thumbnail toolbar should be no greater than 7 due to the limited room. Once you setup the thumbnail toolbar, the toolbar cannot be removed due to the platform's limitation. But you can call the API with an empty array to clean the buttons.

The `buttons` is an array of `Button` objects:

*   `Button` Object
    
    *   `icon` [NativeImage](/docs/api/native-image) - The icon showing in thumbnail toolbar.
    *   `click` Function
    *   `tooltip` String (optional) - The text of the button's tooltip.
    *   `flags` String[](/docs/api/optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

The `flags` is an array that can include following `String`s:

*   `enabled` - The button is active and available to the user.
*   `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
*   `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
*   `nobackground` - Do not draw a button border, use only the image.
*   `hidden` - The button is not shown to the user.
*   `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

#### [`win.setThumbnailClip(region)` _Windows_](#winsetthumbnailclipregion-windows)

*   `region` [Rectangle](/docs/api/structures/rectangle) - Region of the window

Sets the region of the window to show as the thumbnail image displayed when hovering over the window in the taskbar. You can reset the thumbnail to be the entire window by specifying an empty region: `{ x: 0, y: 0, width: 0, height: 0 }`.

#### [`win.setThumbnailToolTip(toolTip)` _Windows_](#winsetthumbnailtooltiptooltip-windows)

*   `toolTip` String

Sets the toolTip that is displayed when hovering over the window thumbnail in the taskbar.

#### [`win.setAppDetails(options)` _Windows_](#winsetappdetailsoptions-windows)

*   `options` Object
    
    *   `appId` String (optional) - Window's [App User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391569(v=vs.85).aspx). It has to be set, otherwise the other options will have no effect.
    *   `appIconPath` String (optional) - Window's [Relaunch Icon](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391573(v=vs.85).aspx).
    *   `appIconIndex` Integer (optional) - Index of the icon in `appIconPath`. Ignored when `appIconPath` is not set. Default is `0`.
    *   `relaunchCommand` String (optional) - Window's [Relaunch Command](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391571(v=vs.85).aspx).
    *   `relaunchDisplayName` String (optional) - Window's [Relaunch Display Name](https://msdn.microsoft.com/en-us/library/windows/desktop/dd391572(v=vs.85).aspx).

Sets the properties for the window's taskbar button.

**Note:** `relaunchCommand` and `relaunchDisplayName` must always be set together. If one of those properties is not set, then neither will be used.

#### [`win.showDefinitionForSelection()` _macOS_](#winshowdefinitionforselection-macos)

Same as `webContents.showDefinitionForSelection()`.

#### [`win.setIcon(icon)` _Windows_ _Linux_](#winseticonicon-windows-linux)

*   `icon` [NativeImage](/docs/api/native-image)

Changes window icon.

#### [`win.setWindowButtonVisibility(visible)` _macOS_](#winsetwindowbuttonvisibilityvisible-macos)

*   `visible` Boolean

Sets whether the window traffic light buttons should be visible.

This cannot be called when `titleBarStyle` is set to `customButtonsOnHover`.

#### [`win.setAutoHideMenuBar(hide)`](#winsetautohidemenubarhide)

*   `hide` Boolean

Sets whether the window menu bar should hide itself automatically. Once set the menu bar will only show when users press the single `Alt` key.

If the menu bar is already visible, calling `setAutoHideMenuBar(true)` won't hide it immediately.

#### [`win.isMenuBarAutoHide()`](#winismenubarautohide)

Returns `Boolean` - Whether menu bar automatically hides itself.

#### [`win.setMenuBarVisibility(visible)` _Windows_ _Linux_](#winsetmenubarvisibilityvisible-windows-linux)

*   `visible` Boolean

Sets whether the menu bar should be visible. If the menu bar is auto-hide, users can still bring up the menu bar by pressing the single `Alt` key.

#### [`win.isMenuBarVisible()`](#winismenubarvisible)

Returns `Boolean` - Whether the menu bar is visible.

#### [`win.setVisibleOnAllWorkspaces(visible[, options])`](#winsetvisibleonallworkspacesvisible-options)

*   `visible` Boolean
*   `options` Object (optional)
    
    *   `visibleOnFullScreen` Boolean (optional) _macOS_ - Sets whether the window should be visible above fullscreen windows

Sets whether the window should be visible on all workspaces.

**Note:** This API does nothing on Windows.

#### [`win.isVisibleOnAllWorkspaces()`](#winisvisibleonallworkspaces)

Returns `Boolean` - Whether the window is visible on all workspaces.

**Note:** This API always returns false on Windows.

#### [`win.setIgnoreMouseEvents(ignore[, options])`](#winsetignoremouseeventsignore-options)

*   `ignore` Boolean
*   `options` Object (optional)
    
    *   `forward` Boolean (optional) _macOS_ _Windows_ - If true, forwards mouse move messages to Chromium, enabling mouse related events such as `mouseleave`. Only used when `ignore` is true. If `ignore` is false, forwarding is always disabled regardless of this value.

Makes the window ignore all mouse events.

All mouse events happened in this window will be passed to the window below this window, but if this window has focus, it will still receive keyboard events.

#### [`win.setContentProtection(enable)` _macOS_ _Windows_](#winsetcontentprotectionenable-macos-windows)

*   `enable` Boolean

Prevents the window contents from being captured by other apps.

On macOS it sets the NSWindow's sharingType to NSWindowSharingNone. On Windows it calls SetWindowDisplayAffinity with `WDA_MONITOR`.

#### [`win.setFocusable(focusable)` _Windows_](#winsetfocusablefocusable-windows)

*   `focusable` Boolean

Changes whether the window can be focused.

#### [`win.setParentWindow(parent)` _Linux_ _macOS_](#winsetparentwindowparent-linux-macos)

*   `parent` BrowserWindow

Sets `parent` as current window's parent window, passing `null` will turn current window into a top-level window.

#### [`win.getParentWindow()`](#wingetparentwindow)

Returns `BrowserWindow` - The parent window.

#### [`win.getChildWindows()`](#wingetchildwindows)

Returns `BrowserWindow[]` - All child windows.

#### [`win.setAutoHideCursor(autoHide)` _macOS_](#winsetautohidecursorautohide-macos)

*   `autoHide` Boolean

Controls whether to hide cursor when typing.

#### [`win.selectPreviousTab()` _macOS_](#winselectprevioustab-macos)

Selects the previous tab when native tabs are enabled and there are other tabs in the window.

#### [`win.selectNextTab()` _macOS_](#winselectnexttab-macos)

Selects the next tab when native tabs are enabled and there are other tabs in the window.

#### [`win.mergeAllWindows()` _macOS_](#winmergeallwindows-macos)

Merges all windows into one window with multiple tabs when native tabs are enabled and there is more than one open window.

#### [`win.moveTabToNewWindow()` _macOS_](#winmovetabtonewwindow-macos)

Moves the current tab into a new window if native tabs are enabled and there is more than one tab in the current window.

#### [`win.toggleTabBar()` _macOS_](#wintoggletabbar-macos)

Toggles the visibility of the tab bar if native tabs are enabled and there is only one tab in the current window.

#### [`win.addTabbedWindow(browserWindow)` _macOS_](#winaddtabbedwindowbrowserwindow-macos)

*   `browserWindow` BrowserWindow

Adds a window as a tab on this window, after the tab for the window instance.

#### [`win.setVibrancy(type)` _macOS_](#winsetvibrancytype-macos)

*   `type` String - Can be `appearance-based`, `light`, `dark`, `titlebar`, `selection`, `menu`, `popover`, `sidebar`, `medium-light` or `ultra-dark`. See the [macOS documentation](https://developer.apple.com/documentation/appkit/nsvisualeffectview?preferredLanguage=objc) for more details.

Adds a vibrancy effect to the browser window. Passing `null` or an empty string will remove the vibrancy effect on the window.

#### [`win.setTouchBar(touchBar)` _macOS_ _Experimental_](#winsettouchbartouchbar-macos-experimental)

*   `touchBar` TouchBar

Sets the touchBar layout for the current window. Specifying `null` or `undefined` clears the touch bar. This method only has an effect if the machine has a touch bar and is running on macOS 10.12.1+.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

#### [`win.setBrowserView(browserView)` _Experimental_](#winsetbrowserviewbrowserview-experimental)

*   `browserView` [BrowserView](/docs/api/browser-view)

#### [`win.getBrowserView()` _Experimental_](#wingetbrowserview-experimental)

Returns `BrowserView | null` - an attached BrowserView. Returns `null` if none is attached.

**Note:** The BrowserView API is currently experimental and may change or be removed in future Electron releases.

* * *

[Class: BrowserWindowProxy](#class-browserwindowproxy)
------------------------------------------------------

> Manipulate the child browser window

Process: [Renderer](/docs/glossary#renderer-process)

The `BrowserWindowProxy` object is returned from `window.open` and provides limited functionality with the child window.

### [Instance Methods](#instance-methods)

The `BrowserWindowProxy` object has the following instance methods:

#### [`win.blur()`](#winblur)

Removes focus from the child window.

#### [`win.close()`](#winclose)

Forcefully closes the child window without calling its unload event.

#### [`win.eval(code)`](#winevalcode)

*   `code` String

Evaluates the code in the child window.

#### [`win.focus()`](#winfocus)

Focuses the child window (brings the window to front).

#### [`win.print()`](#winprint)

Invokes the print dialog on the child window.

#### [`win.postMessage(message, targetOrigin)`](#winpostmessagemessage-targetorigin)

*   `message` String
*   `targetOrigin` String

Sends a message to the child window with the specified origin or `*` for no origin preference.

In addition to these methods, the child window implements `window.opener` object with no properties and a single method.

### [Instance Properties](#instance-properties)

The `BrowserWindowProxy` object has the following instance properties:

#### [`win.closed`](#winclosed)

A `Boolean` that is set to true after the child window gets closed.

* * *

[Build Instructions](#build-instructions)
=========================================

Follow the guidelines below for building Electron.

[Platform prerequisites](#platform-prerequisites)
-------------------------------------------------

Check the build prerequisites for your platform before proceeding

*   [macOS](/docs/development/build-instructions-macos#prerequisites)
*   [Linux](/docs/development/build-instructions-linux#prerequisites)
*   [Windows](/docs/development/build-instructions-windows#prerequisites)

[GN prerequisites](#gn-prerequisites)
-------------------------------------

You'll need to install [`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up), the toolset used for fetching Chromium and its dependencies.

Also, on Windows, you'll need to set the environment variable `DEPOT_TOOLS_WIN_TOOLCHAIN=0`. To do so, open `Control Panel` → `System and Security` → `System` → `Advanced system settings` and add a system variable `DEPOT_TOOLS_WIN_TOOLCHAIN` with value `0`. This tells `depot_tools` to use your locally installed version of Visual Studio (by default, `depot_tools` will try to download a Google-internal version that only Googlers have access to).

[Cached builds (optional step)](#cached-builds-optional-step)
-------------------------------------------------------------

### [GIT\_CACHE\_PATH](#git_cache_path)

If you plan on building Electron more than once, adding a git cache will speed up subsequent calls to `gclient`. To do this, set a `GIT_CACHE_PATH` environment variable:

    $ export GIT_CACHE_PATH="${HOME}/.git_cache"
    $ mkdir -p "${GIT_CACHE_PATH}"
    # This will use about 16G.

> **NOTE**: the git cache will set the `origin` of the `src/electron` repository to point to the local cache, instead of the upstream git repository. This is undesirable when running `git push`—you probably want to push to github, not your local cache. To fix this, from the `src/electron` directory, run:

    $ git remote set-url origin https://github.com/electron/electron

### [sccache](#sccache)

Thousands of files must be compiled to build Chromium and Electron. You can avoid much of the wait by reusing Electron CI's build output via [sccache](https://github.com/mozilla/sccache). This requires some optional steps (listed below) and these two environment variables:

    export SCCACHE_BUCKET="electronjs-sccache"
    export SCCACHE_TWO_TIER=true

[Getting the code](#getting-the-code)
-------------------------------------

    $ mkdir electron-gn && cd electron-gn
    $ gclient config \
        --name "src/electron" \
        --unmanaged \
        https://github.com/electron/electron
    $ gclient sync --with_branch_heads --with_tags
    # This will take a while, go get a coffee.

> Instead of `https://github.com/electron/electron`, you can use your own fork here (something like `https://github.com/<username>/electron`).

#### [A note on pulling/pushing](#a-note-on-pullingpushing)

If you intend to `git pull` or `git push` from the official `electron` repository in the future, you now need to update the respective folder's origin URLs.

    $ cd src/electron
    $ git remote remove origin
    $ git remote add origin https://github.com/electron/electron
    $ git branch --set-upstream-to=origin/master
    $ cd -

📝 `gclient` works by checking a file called `DEPS` inside the `src/electron` folder for dependencies (like Chromium or Node.js). Running `gclient sync -f` ensures that all dependencies required to build Electron match that file.

So, in order to pull, you'd run the following commands:

    $ cd src/electron
    $ git pull
    $ gclient sync -f

[Building](#building)
---------------------

    $ cd src
    $ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
    # this next line is needed only if building with sccache
    $ export GN_EXTRA_ARGS="${GN_EXTRA_ARGS} cc_wrapper=\"${PWD}/electron/external_binaries/sccache\""
    $ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"

Or on Windows (without the optional argument):

    $ cd src
    $ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
    $ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\")"

This will generate a build directory `out/Debug` under `src/` with debug build configuration. You can replace `Debug` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Debug` to bring up an editor.

To see the list of available build configuration options, run `gn args out/Debug --list`.

**For generating Debug (aka "component" or "shared") build config of Electron:**

    $ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"

**For generating Release (aka "non-component" or "static") build config of Electron:**

    $ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"

**To build, run `ninja` with the `electron` target:** Nota Bene: This will also take a while and probably heat up your lap.

For the debug configuration:

    $ ninja -C out/Debug electron

For the release configuration:

    $ ninja -C out/Release electron

This will build all of what was previously 'libchromiumcontent' (i.e. the `content/` directory of `chromium` and its dependencies, incl. WebKit and V8), so it will take a while.

To speed up subsequent builds, you can use [sccache](https://github.com/mozilla/sccache). Add the GN arg `cc_wrapper = "sccache"` by running `gn args out/Debug` to bring up an editor and adding a line to the end of the file.

The built executable will be under `./out/Debug`:

    $ ./out/Debug/Electron.app/Contents/MacOS/Electron
    # or, on Windows
    $ ./out/Debug/electron.exe
    # or, on Linux
    $ ./out/Debug/electron

### [Packaging](#packaging)

On linux, first strip the debugging and symbol information:

    electron/script/strip-binaries.py -d out/Release

To package the electron build as a distributable zip file:

    ninja -C out/Release electron:electron_dist_zip

### [Cross-compiling](#cross-compiling)

To compile for a platform that isn't the same as the one you're building on, set the `target_cpu` and `target_os` GN arguments. For example, to compile an x86 target from an x64 host, specify `target_cpu = "x86"` in `gn args`.

    $ gn gen out/Debug-x86 --args='... target_cpu = "x86"'

Not all combinations of source and target CPU/OS are supported by Chromium. Only cross-compiling Windows 32-bit from Windows 64-bit and Linux 32-bit from Linux 64-bit have been tested in Electron. If you test other combinations and find them to work, please update this document :)

See the GN reference for allowable values of [`target_os`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values) and [`target_cpu`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values)

[Tests](#tests)
---------------

To run the tests, you'll first need to build the test modules against the same version of Node.js that was built as part of the build process. To generate build headers for the modules to compile against, run the following under `src/` directory.

    $ ninja -C out/Debug third_party/electron_node:headers
    # Install the test modules with the generated headers
    $ (cd electron/spec && npm i --nodedir=../../out/Debug/gen/node_headers)

Then, run Electron with `electron/spec` as the argument:

    # on Mac:
    $ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec
    # on Windows:
    $ ./out/Debug/electron.exe electron/spec
    # on Linux:
    $ ./out/Debug/electron electron/spec

If you're debugging something, it can be helpful to pass some extra flags to the Electron binary:

    $ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec \
      --ci --enable-logging -g 'BrowserWindow module'

[Sharing the git cache between multiple machines](#sharing-the-git-cache-between-multiple-machines)
---------------------------------------------------------------------------------------------------

It is possible to share the gclient git cache with other machines by exporting it as SMB share on linux, but only one process/machine can be using the cache at a time. The locks created by git-cache script will try to prevent this, but it may not work perfectly in a network.

On Windows, SMBv2 has a directory cache that will cause problems with the git cache script, so it is necessary to disable it by setting the registry key

    HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime

to 0. More information: [https://stackoverflow.com/a/9935126](https://stackoverflow.com/a/9935126)

[Troubleshooting](#troubleshooting)
-----------------------------------

### [Stale locks in the git cache](#stale-locks-in-the-git-cache)

If `gclient sync` is interrupted while using the git cache, it will leave the cache locked. To remove the lock, pass the `--break_repo_locks` argument to `gclient sync`.

### [I'm being asked for a username/password for chromium-internal.googlesource.com](#im-being-asked-for-a-usernamepassword-for-chromium-internalgooglesourcecom)

If you see a prompt for `Username for 'https://chrome-internal.googlesource.com':` when running `gclient sync` on Windows, it's probably because the `DEPOT_TOOLS_WIN_TOOLCHAIN` environment variable is not set to 0. Open `Control Panel` → `System and Security` → `System` → `Advanced system settings` and add a system variable `DEPOT_TOOLS_WIN_TOOLCHAIN` with value `0`. This tells `depot_tools` to use your locally installed version of Visual Studio (by default, `depot_tools` will try to download a Google-internal version that only Googlers have access to).

* * *

[Build Instructions (Linux)](#build-instructions-linux)
=======================================================

Follow the guidelines below for building Electron on Linux.

[Prerequisites](#prerequisites)
-------------------------------

*   At least 25GB disk space and 8GB RAM.
    
*   Python 2.7.x. Some distributions like CentOS 6.x still use Python 2.6.x so you may need to check your Python version with `python -V`.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
        $ npm run check-tls
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. Alternatively, visit [https://www.python.org/downloads/](https://www.python.org/downloads/) for detailed instructions.
    
*   Node.js. There are various ways to install Node. You can download source code from [nodejs.org](https://nodejs.org) and compile it. Doing so permits installing Node on your own home directory as a standard user. Or try repositories such as [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
    
*   [clang](https://clang.llvm.org/get_started.html) 3.4 or later.
    
*   Development headers of GTK+ and libnotify.
    

On Ubuntu, install the following libraries:

    $ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                           libnotify-dev libgnome-keyring-dev libgconf2-dev \
                           libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                           libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                           gperf bison python-dbusmock

On RHEL / CentOS, install the following libraries:

    $ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                       libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                       cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                       GConf2-devel nss-devel python-dbusmock

On Fedora, install the following libraries:

    $ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                       libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                       cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                       GConf2-devel nss-devel python-dbusmock

Other distributions may offer similar packages for installation via package managers such as pacman. Or one can compile from source code.

### [Cross compilation](#cross-compilation)

If you want to build for an `arm` target you should also install the following dependencies:

    $ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                           g++-arm-linux-gnueabihf

Similarly for `arm64`, install the following:

    $ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                           g++-aarch64-linux-gnu

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

    $ gn gen out/Debug --args='import(...) target_cpu="arm"'

[Building](#building)
---------------------

See [Build Instructions: GN](/docs/development/build-instructions-gn)

[Troubleshooting](#troubleshooting)
-----------------------------------

### [Error While Loading Shared Libraries: libtinfo.so.5](#error-while-loading-shared-libraries-libtinfoso5)

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

    $ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5

[Advanced topics](#advanced-topics)
-----------------------------------

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### [Using system `clang` instead of downloaded `clang` binaries](#using-system-clang-instead-of-downloaded-clang-binaries)

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

    $ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'

### [Using compilers other than `clang`](#using-compilers-other-than-clang)

Building Electron with compilers other than `clang` is not supported.

* * *

[Build Instructions (macOS)](#build-instructions-macos)
=======================================================

Follow the guidelines below for building Electron on macOS.

[Prerequisites](#prerequisites)
-------------------------------

*   macOS >= 10.11.6
*   [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
*   [node.js](https://nodejs.org) (external)
*   Python 2.7 with support for TLS 1.2

[Python](#python)
-----------------

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

    $ npm run check-tls

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

    $ brew install python@2 && brew link python@2 --force

If you are using Python as provided by Homebrew, you also need to install the following Python modules:

*   [pyobjc](https://pythonhosted.org/pyobjc/install.html)

[macOS SDK](#macos-sdk)
-----------------------

If you're developing Electron and don't plan to redistribute your custom Electron build, you may skip this section.

Official Electron builds are built with [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), and the MacOS 10.13 SDK. Building with a newer SDK works too, but the releases currently use the 10.13 SDK.

[Building Electron](#building-electron)
---------------------------------------

See [Build Instructions: GN](/docs/development/build-instructions-gn).

* * *

[Build Instructions (Windows)](#build-instructions-windows)
===========================================================

Follow the guidelines below for building Electron on Windows.

[Prerequisites](#prerequisites)
-------------------------------

*   Windows 10 / Server 2012 R2 or higher
*   Visual Studio 2017 15.7.2 or higher - [download VS 2017 Community Edition for free](https://www.visualstudio.com/vs/)
*   [Python 2.7.10 or higher](http://www.python.org/download/releases/2.7/)
    
    *   Contrary to the `depot_tools` setup instructions linked below, you will need to use your locally installed Python with at least version 2.7.10 (with support for TLS 1.2). To do so, make sure that in **PATH**, your locally installed Python comes before the `depot_tools` folder. Right now `depot_tools` still comes with Python 2.7.6, which will cause the `gclient` command to fail (see [https://crbug.com/868864](https://crbug.com/868864)).
    *   [Python for Windows (pywin32) Extensions](https://pypi.org/project/pywin32/#files) is also needed in order to run the build process.
*   [Node.js](https://nodejs.org/download/)
*   [Git](http://git-scm.com)
*   Debugging Tools for Windows of Windows SDK 10.0.15063.468 if you plan on creating a full distribution since `symstore.exe` is used for creating a symbol store from `.pdb` files.
    
    *   Different versions of the SDK can be installed side by side. To install the SDK, open Visual Studio Installer, select `Change` → `Individual Components`, scroll down and select the appropriate Windows SDK to install. Another option would be to look at the [Windows SDK and emulator archive](https://developer.microsoft.com/en-us/windows/downloads/sdk-archive) and download the standalone version of the SDK respectively.
    *   The SDK Debugging Tools must also be installed. If the Windows 10 SDK was installed via the Visual Studio installer, then they can be installed by going to: `Control Panel` → `Programs` → `Programs and Features` → Select the "Windows Software Development Kit" → `Change` → `Change` → Check "Debugging Tools For Windows" → `Change`. Or, you can download the standalone SDK installer and use it to install the Debugging Tools.

If you don't currently have a Windows installation, [dev.microsoftedge.com](https://developer.microsoft.com/en-us/microsoft-edge/tools/vms/) has timebombed versions of Windows that you can use to build Electron.

Building Electron is done entirely with command-line scripts and cannot be done with Visual Studio. You can develop Electron with any editor but support for building with Visual Studio will come in the future.

**Note:** Even though Visual Studio is not used for building, it's still **required** because we need the build toolchains it provides.

[Building](#building)
---------------------

See [Build Instructions: GN](/docs/development/build-instructions-gn)

[32bit Build](#32bit-build)
---------------------------

To build for the 32bit target, you need to pass `target_cpu = "x86"` as a GN arg. You can build the 32bit target alongside the 64bit target by using a different output directory for GN, e.g. `out/Release-x86`, with different arguments.

    $ gn gen out/Release-x86 --args="import(\"//electron/build/args/release.gn\") target_cpu=\"x86\""

The other building steps are exactly the same.

[Visual Studio project](#visual-studio-project)
-----------------------------------------------

To generate a Visual Studio project, you can pass the `--ide=vs2017` parameter to `gn gen`:

    $ gn gen out/Debug --ide=vs2017

[Troubleshooting](#troubleshooting)
-----------------------------------

### [Command xxxx not found](#command-xxxx-not-found)

If you encountered an error like `Command xxxx not found`, you may try to use the `VS2015 Command Prompt` console to execute the build scripts.

### [Fatal internal compiler error: C1001](#fatal-internal-compiler-error-c1001)

Make sure you have the latest Visual Studio update installed.

### [LNK1181: cannot open input file 'kernel32.lib'](#lnk1181-cannot-open-input-file-kernel32lib)

Try reinstalling 32bit Node.js.

### [Error: ENOENT, stat 'C:\\Users\\USERNAME\\AppData\\Roaming\\npm'](#error-enoent-stat-cusersusernameappdataroamingnpm)

Creating that directory [should fix the problem](https://stackoverflow.com/a/25095327/102704):

    $ mkdir ~\AppData\Roaming\npm

### [node-gyp is not recognized as an internal or external command](#node-gyp-is-not-recognized-as-an-internal-or-external-command)

You may get this error if you are using Git Bash for building, you should use PowerShell or VS2015 Command Prompt instead.

### [cannot create directory at '...': Filename too long](#cannot-create-directory-at--filename-too-long)

node.js has some [extremely long pathnames](https://github.com/electron/node/tree/electron/deps/npm/node_modules/libnpx/node_modules/yargs/node_modules/read-pkg-up/node_modules/read-pkg/node_modules/load-json-file/node_modules/parse-json/node_modules/error-ex/node_modules/is-arrayish), and by default git on windows doesn't handle long pathnames correctly (even though windows supports them). This should fix it:

    $ git config --system core.longpaths true

### [error: use of undeclared identifier 'DefaultDelegateCheckMode'](#error-use-of-undeclared-identifier-defaultdelegatecheckmode)

This can happen during build, when Debugging Tools for Windows has been installed with Windows Driver Kit. Uninstall Windows Driver Kit and install Debugging Tools with steps described above.

### [ImportError: No module named win32file](#importerror-no-module-named-win32file)

Make sure you have installed `pywin32` with `pip install pywin32`.

* * *

[Build System Overview](#build-system-overview)
===============================================

Electron uses [GN](https://gn.googlesource.com/gn) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gn` and `.gni` files.

[GN Files](#gn-files)
---------------------

The following `gn` files contain the main rules for building Electron:

*   `BUILD.gn` defines how Electron itself is built and includes the default configurations for linking with Chromium.
*   `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

[Component Build](#component-build)
-----------------------------------

Since Chromium is quite a large project, the final linking stage can take quite a few minutes, which makes it hard for development. In order to solve this, Chromium introduced the "component build", which builds each component as a separate shared library, making linking very quick but sacrificing file size and performance.

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

[Tests](#tests)
---------------

**NB** _this section is out of date and contains information that is no longer relevant to the GN-built electron._

Test your changes conform to the project coding style using:

    $ npm run lint

Test functionality using:

    $ npm test

Whenever you make changes to Electron source code, you'll need to re-run the build before the tests:

    $ npm run build && npm test

You can make the test suite run faster by isolating the specific test or block you're currently working on using Mocha's [exclusive tests](https://mochajs.org/#exclusive-tests) feature. Append `.only` to any `describe` or `it` function call:

    describe.only('some feature', function () {
      // ... only tests in this block will be run
    })

Alternatively, you can use mocha's `grep` option to only run tests matching the given regular expression pattern:

    $ npm test -- --grep child_process

Tests that include native modules (e.g. `runas`) can't be executed with the debug build (see [#2558](https://github.com/electron/electron/issues/2558) for details), but they will work with the release build.

To run the tests with the release build use:

    $ npm test -- -R

* * *

[Certificate Object](#certificate-object)
=========================================

*   `data` String - PEM encoded data
*   `issuer` [CertificatePrincipal](/docs/api/structures/certificate-principal) - Issuer principal
*   `issuerName` String - Issuer's Common Name
*   `issuerCert` Certificate - Issuer certificate (if not self-signed)
*   `subject` [CertificatePrincipal](/docs/api/structures/certificate-principal) - Subject principal
*   `subjectName` String - Subject's Common Name
*   `serialNumber` String - Hex value represented string
*   `validStart` Number - Start date of the certificate being valid in seconds
*   `validExpiry` Number - End date of the certificate being valid in seconds
*   `fingerprint` String - Fingerprint of the certificate

* * *

[CertificatePrincipal Object](#certificateprincipal-object)
===========================================================

*   `commonName` String - Common Name.
*   `organizations` String\[\] - Organization names.
*   `organizationUnits` String\[\] - Organization Unit names.
*   `locality` String - Locality.
*   `state` String - State or province.
*   `country` String - Country or region.

* * *

[Supported Chrome Command Line Switches](#supported-chrome-command-line-switches)
=================================================================================

> Command line switches supported by Electron.

You can use [app.commandLine.appendSwitch](/docs/api/app#appcommandlineappendswitchswitch-value) to append them in your app's main script before the [ready](/docs/api/app#event-ready) event of the [app](/docs/api/app) module is emitted:

    const { app } = require('electron')
    app.commandLine.appendSwitch('remote-debugging-port', '8315')
    app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')
    
    app.on('ready', () => {
      // Your code here
    })

[\--ignore-connections-limit=`domains`](#--ignore-connections-limitdomains)
---------------------------------------------------------------------------

Ignore the connections limit for `domains` list separated by `,`.

[\--disable-http-cache](#--disable-http-cache)
----------------------------------------------

Disables the disk cache for HTTP requests.

[\--disable-http2](#--disable-http2)
------------------------------------

Disable HTTP/2 and SPDY/3.1 protocols.

[\--lang](#--lang)
------------------

Set a custom locale.

[\--inspect=`port` and --inspect-brk=`port`](#--inspectport-and---inspect-brkport)
----------------------------------------------------------------------------------

Debug-related flags, see the [Debugging the Main Process](/docs/tutorial/debugging-main-process) guide for details.

[\--remote-debugging-port=`port`](#--remote-debugging-portport)
---------------------------------------------------------------

Enables remote debugging over HTTP on the specified `port`.

[\--disk-cache-size=`size`](#--disk-cache-sizesize)
---------------------------------------------------

Forces the maximum disk space to be used by the disk cache, in bytes.

[\--js-flags=`flags`](#--js-flagsflags)
---------------------------------------

Specifies the flags passed to the Node JS engine. It has to be passed when starting Electron if you want to enable the `flags` in the main process.

    $ electron --js-flags="--harmony_proxies --harmony_collections" your-app

See the [Node documentation](https://nodejs.org/api/cli.html) or run `node --help` in your terminal for a list of available flags. Additionally, run `node --v8-options` to see a list of flags that specifically refer to Node's V8 JavaScript engine.

[\--proxy-server=`address:port`](#--proxy-serveraddressport)
------------------------------------------------------------

Use a specified proxy server, which overrides the system setting. This switch only affects requests with HTTP protocol, including HTTPS and WebSocket requests. It is also noteworthy that not all proxy servers support HTTPS and WebSocket requests. The proxy URL does not support username and password authentication [per Chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

[\--proxy-bypass-list=`hosts`](#--proxy-bypass-listhosts)
---------------------------------------------------------

Instructs Electron to bypass the proxy server for the given semi-colon-separated list of hosts. This flag has an effect only if used in tandem with `--proxy-server`.

For example:

    const { app } = require('electron')
    app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')

Will use the proxy server for all hosts except for local addresses (`localhost`, `127.0.0.1` etc.), `google.com` subdomains, hosts that contain the suffix `foo.com` and anything at `1.2.3.4:5678`.

[\--proxy-pac-url=`url`](#--proxy-pac-urlurl)
---------------------------------------------

Uses the PAC script at the specified `url`.

[\--no-proxy-server](#--no-proxy-server)
----------------------------------------

Don't use a proxy server and always make direct connections. Overrides any other proxy server flags that are passed.

[\--host-rules=`rules`](#--host-rulesrules)
-------------------------------------------

A comma-separated list of `rules` that control how hostnames are mapped.

For example:

*   `MAP * 127.0.0.1` Forces all hostnames to be mapped to 127.0.0.1
*   `MAP *.google.com proxy` Forces all google.com subdomains to be resolved to "proxy".
*   `MAP test.com [::1]:77` Forces "test.com" to resolve to IPv6 loopback. Will also force the port of the resulting socket address to be 77.
*   `MAP * baz, EXCLUDE www.google.com` Remaps everything to "baz", except for "www.google.com".

These mappings apply to the endpoint host in a net request (the TCP connect and host resolver in a direct connection, and the `CONNECT` in an HTTP proxy connection, and the endpoint host in a `SOCKS` proxy connection).

[\--host-resolver-rules=`rules`](#--host-resolver-rulesrules)
-------------------------------------------------------------

Like `--host-rules` but these `rules` only apply to the host resolver.

[\--auth-server-whitelist=`url`](#--auth-server-whitelisturl)
-------------------------------------------------------------

A comma-separated list of servers for which integrated authentication is enabled.

For example:

    --auth-server-whitelist='*example.com, *foobar.com, *baz'

then any `url` ending with `example.com`, `foobar.com`, `baz` will be considered for integrated authentication. Without `*` prefix the url has to match exactly.

[\--auth-negotiate-delegate-whitelist=`url`](#--auth-negotiate-delegate-whitelisturl)
-------------------------------------------------------------------------------------

A comma-separated list of servers for which delegation of user credentials is required. Without `*` prefix the url has to match exactly.

[\--ignore-certificate-errors](#--ignore-certificate-errors)
------------------------------------------------------------

Ignores certificate related errors.

[\--ppapi-flash-path=`path`](#--ppapi-flash-pathpath)
-----------------------------------------------------

Sets the `path` of the pepper flash plugin.

[\--ppapi-flash-version=`version`](#--ppapi-flash-versionversion)
-----------------------------------------------------------------

Sets the `version` of the pepper flash plugin.

[\--log-net-log=`path`](#--log-net-logpath)
-------------------------------------------

Enables net log events to be saved and writes them to `path`.

[\--disable-renderer-backgrounding](#--disable-renderer-backgrounding)
----------------------------------------------------------------------

Prevents Chromium from lowering the priority of invisible pages' renderer processes.

This flag is global to all renderer processes, if you only want to disable throttling in one window, you can take the hack of [playing silent audio](https://github.com/atom/atom/pull/9485/files).

[\--enable-logging](#--enable-logging)
--------------------------------------

Prints Chromium's logging into console.

This switch can not be used in `app.commandLine.appendSwitch` since it is parsed earlier than user's app is loaded, but you can set the `ELECTRON_ENABLE_LOGGING` environment variable to achieve the same effect.

[\--v=`log_level`](#--vlog_level)
---------------------------------

Gives the default maximal active V-logging level; 0 is the default. Normally positive values are used for V-logging levels.

This switch only works when `--enable-logging` is also passed.

[\--vmodule=`pattern`](#--vmodulepattern)
-----------------------------------------

Gives the per-module maximal V-logging levels to override the value given by `--v`. E.g. `my_module=2,foo*=3` would change the logging level for all code in source files `my_module.*` and `foo*.*`.

Any pattern containing a forward or backward slash will be tested against the whole pathname and not only the module. E.g. `*/foo/bar/*=2` would change the logging level for all code in the source files under a `foo/bar` directory.

This switch only works when `--enable-logging` is also passed.

* * *

[Chromium Development](#chromium-development)
=============================================

> A collection of resources for learning about Chromium and tracking its development

*   [@ChromiumDev](https://twitter.com/ChromiumDev) on Twitter
*   [@googlechrome](https://twitter.com/googlechrome) on Twitter
*   [Blog](https://blog.chromium.org)
*   [Code Search](https://cs.chromium.org/)
*   [Source Code](https://cs.chromium.org/chromium/src/)
*   [Development Calendar and Release Info](https://www.chromium.org/developers/calendar)
*   [Discussion Groups](http://www.chromium.org/developers/discussion-groups)

See also [V8 Development](/docs/development/v8-development)

* * *

[Using clang-format on C++ Code](#using-clang-format-on-c-code)
===============================================================

[`clang-format`](http://clang.llvm.org/docs/ClangFormat.html) is a tool to automatically format C/C++/Objective-C code, so that developers don't need to worry about style issues during code reviews.

It is highly recommended to format your changed C++ code before opening pull requests, which will save you and the reviewers' time.

You can install `clang-format` and `git-clang-format` via `npm install -g clang-format`.

To automatically format a file according to Electron C++ code style, run `clang-format -i path/to/electron/file.cc`. It should work on macOS/Linux/Windows.

The workflow to format your changed code:

1.  Make codes changes in Electron repository.
2.  Run `git add your_changed_file.cc`.
3.  Run `git-clang-format`, and you will probably see modifications in `your_changed_file.cc`, these modifications are generated from `clang-format`.
4.  Run `git add your_changed_file.cc`, and commit your change.
5.  Now the branch is ready to be opened as a pull request.

If you want to format the changed code on your latest git commit (HEAD), you can run `git-clang-format HEAD~1`. See `git-clang-format -h` for more details.

[Editor Integration](#editor-integration)
-----------------------------------------

You can also integrate `clang-format` directly into your favorite editors. For further guidance on setting up editor integration, see these pages:

*   [Atom](https://atom.io/packages/clang-format)
*   [Vim & Emacs](http://clang.llvm.org/docs/ClangFormat.html#vim-integration)
*   [Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=xaver.clang-format)

* * *

[Class: ClientRequest](#class-clientrequest)
--------------------------------------------

> Make HTTP/HTTPS requests.

Process: [Main](/docs/glossary#main-process)

`ClientRequest` implements the [Writable Stream](https://nodejs.org/api/stream.html#stream_writable_streams) interface and is therefore an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### [`new ClientRequest(options)`](#new-clientrequestoptions)

*   `options` (Object | String) - If `options` is a String, it is interpreted as the request URL. If it is an object, it is expected to fully specify an HTTP request via the following properties:
    
    *   `method` String (optional) - The HTTP request method. Defaults to the GET method.
    *   `url` String (optional) - The request URL. Must be provided in the absolute form with the protocol scheme specified as http or https.
    *   `session` Object (optional) - The [`Session`](/docs/api/session) instance with which the request is associated.
    *   `partition` String (optional) - The name of the [`partition`](/docs/api/session) with which the request is associated. Defaults to the empty string. The `session` option prevails on `partition`. Thus if a `session` is explicitly specified, `partition` is ignored.
    *   `protocol` String (optional) - The protocol scheme in the form 'scheme:'. Currently supported values are 'http:' or 'https:'. Defaults to 'http:'.
    *   `host` String (optional) - The server host provided as a concatenation of the hostname and the port number 'hostname:port'.
    *   `hostname` String (optional) - The server host name.
    *   `port` Integer (optional) - The server's listening port number.
    *   `path` String (optional) - The path part of the request URL.
    *   `redirect` String (optional) - The redirect mode for this request. Should be one of `follow`, `error` or `manual`. Defaults to `follow`. When mode is `error`, any redirection will be aborted. When mode is `manual` the redirection will be deferred until [`request.followRedirect`](#requestfollowredirect) is invoked. Listen for the [`redirect`](#event-redirect) event in this mode to get more details about the redirect request.

`options` properties such as `protocol`, `host`, `hostname`, `port` and `path` strictly follow the Node.js model as described in the [URL](https://nodejs.org/api/url.html) module.

For instance, we could have created the same request to 'github.com' as follows:

    const request = net.request({
      method: 'GET',
      protocol: 'https:',
      hostname: 'github.com',
      port: 443,
      path: '/'
    })

### [Instance Events](#instance-events)

#### [Event: 'response'](#event-response)

Returns:

*   `response` IncomingMessage - An object representing the HTTP response message.

#### [Event: 'login'](#event-login)

Returns:

*   `authInfo` Object
    
    *   `isProxy` Boolean
    *   `scheme` String
    *   `host` String
    *   `port` Integer
    *   `realm` String
*   `callback` Function
    
    *   `username` String
    *   `password` String

Emitted when an authenticating proxy is asking for user credentials.

The `callback` function is expected to be called back with user credentials:

*   `username` String
*   `password` String

    request.on('login', (authInfo, callback) => {
      callback('username', 'password')
    })

Providing empty credentials will cancel the request and report an authentication error on the response object:

    request.on('response', (response) => {
      console.log(`STATUS: ${response.statusCode}`);
      response.on('error', (error) => {
        console.log(`ERROR: ${JSON.stringify(error)}`)
      })
    })
    request.on('login', (authInfo, callback) => {
      callback()
    })

#### [Event: 'finish'](#event-finish)

Emitted just after the last chunk of the `request`'s data has been written into the `request` object.

#### [Event: 'abort'](#event-abort)

Emitted when the `request` is aborted. The `abort` event will not be fired if the `request` is already closed.

#### [Event: 'error'](#event-error)

Returns:

*   `error` Error - an error object providing some information about the failure.

Emitted when the `net` module fails to issue a network request. Typically when the `request` object emits an `error` event, a `close` event will subsequently follow and no response object will be provided.

#### [Event: 'close'](#event-close)

Emitted as the last event in the HTTP request-response transaction. The `close` event indicates that no more events will be emitted on either the `request` or `response` objects.

#### [Event: 'redirect'](#event-redirect)

Returns:

*   `statusCode` Integer
*   `method` String
*   `redirectUrl` String
*   `responseHeaders` Object

Emitted when there is redirection and the mode is `manual`. Calling [`request.followRedirect`](#requestfollowredirect) will continue with the redirection.

### [Instance Properties](#instance-properties)

#### [`request.chunkedEncoding`](#requestchunkedencoding)

A `Boolean` specifying whether the request will use HTTP chunked transfer encoding or not. Defaults to false. The property is readable and writable, however it can be set only before the first write operation as the HTTP headers are not yet put on the wire. Trying to set the `chunkedEncoding` property after the first write will throw an error.

Using chunked encoding is strongly recommended if you need to send a large request body as data will be streamed in small chunks instead of being internally buffered inside Electron process memory.

### [Instance Methods](#instance-methods)

#### [`request.setHeader(name, value)`](#requestsetheadername-value)

*   `name` String - An extra HTTP header name.
*   `value` Object - An extra HTTP header value.

Adds an extra HTTP header. The header name will issued as it is without lowercasing. It can be called only before first write. Calling this method after the first write will throw an error. If the passed value is not a `String`, its `toString()` method will be called to obtain the final value.

#### [`request.getHeader(name)`](#requestgetheadername)

*   `name` String - Specify an extra header name.

Returns `Object` - The value of a previously set extra header name.

#### [`request.removeHeader(name)`](#requestremoveheadername)

*   `name` String - Specify an extra header name.

Removes a previously set extra header name. This method can be called only before first write. Trying to call it after the first write will throw an error.

#### [`request.write(chunk[, encoding][, callback])`](#requestwritechunk-encoding-callback)

*   `chunk` (String | Buffer) - A chunk of the request body's data. If it is a string, it is converted into a Buffer using the specified encoding.
*   `encoding` String (optional) - Used to convert string chunks into Buffer objects. Defaults to 'utf-8'.
*   `callback` Function (optional) - Called after the write operation ends.

`callback` is essentially a dummy function introduced in the purpose of keeping similarity with the Node.js API. It is called asynchronously in the next tick after `chunk` content have been delivered to the Chromium networking layer. Contrary to the Node.js implementation, it is not guaranteed that `chunk` content have been flushed on the wire before `callback` is called.

Adds a chunk of data to the request body. The first write operation may cause the request headers to be issued on the wire. After the first write operation, it is not allowed to add or remove a custom header.

#### [`request.end([chunk][, encoding][, callback])`](#requestendchunk-encoding-callback)

*   `chunk` (String | Buffer) (optional)
*   `encoding` String (optional)
*   `callback` Function (optional)

Sends the last chunk of the request data. Subsequent write or end operations will not be allowed. The `finish` event is emitted just after the end operation.

#### [`request.abort()`](#requestabort)

Cancels an ongoing HTTP transaction. If the request has already emitted the `close` event, the abort operation will have no effect. Otherwise an ongoing event will emit `abort` and `close` events. Additionally, if there is an ongoing response object,it will emit the `aborted` event.

#### [`request.followRedirect()`](#requestfollowredirect)

Continues any deferred redirection request when the redirection mode is `manual`.

#### [`request.getUploadProgress()`](#requestgetuploadprogress)

Returns `Object`:

*   `active` Boolean - Whether the request is currently active. If this is false no other properties will be set
*   `started` Boolean - Whether the upload has started. If this is false both `current` and `total` will be set to 0.
*   `current` Integer - The number of bytes that have been uploaded so far
*   `total` Integer - The number of bytes that will be uploaded this request

You can use this method in conjunction with `POST` requests to get the progress of a file upload or other data transfer.

* * *

[clipboard](#clipboard)
=======================

> Perform copy and paste operations on the system clipboard.

Process: [Main](/docs/glossary#main-process), [Renderer](/docs/glossary#renderer-process)

In the renderer process context it depends on the [`remote`](/docs/api/remote) module on Linux, it is therefore not available when this module is disabled.

The following example shows how to write a string to the clipboard:

    const { clipboard } = require('electron')
    clipboard.writeText('Example String')

On X Window systems, there is also a selection clipboard. To manipulate it you need to pass `selection` to each method:

    const { clipboard } = require('electron')
    clipboard.writeText('Example String', 'selection')
    console.log(clipboard.readText('selection'))

[Methods](#methods)
-------------------

The `clipboard` module has the following methods:

**Note:** Experimental APIs are marked as such and could be removed in future.

### [`clipboard.readText([type])`](#clipboardreadtexttype)

*   `type` String (optional)

Returns `String` - The content in the clipboard as plain text.

### [`clipboard.writeText(text[, type])`](#clipboardwritetexttext-type)

*   `text` String
*   `type` String (optional)

Writes the `text` into the clipboard as plain text.

### [`clipboard.readHTML([type])`](#clipboardreadhtmltype)

*   `type` String (optional)

Returns `String` - The content in the clipboard as markup.

### [`clipboard.writeHTML(markup[, type])`](#clipboardwritehtmlmarkup-type)

*   `markup` String
*   `type` String (optional)

Writes `markup` to the clipboard.

### [`clipboard.readImage([type])`](#clipboardreadimagetype)

*   `type` String (optional)

Returns [`NativeImage`](/docs/api/native-image) - The image content in the clipboard.

### [`clipboard.writeImage(image[, type])`](#clipboardwriteimageimage-type)

*   `image` [NativeImage](/docs/api/native-image)
*   `type` String (optional)

Writes `image` to the clipboard.

### [`clipboard.readRTF([type])`](#clipboardreadrtftype)

*   `type` String (optional)

Returns `String` - The content in the clipboard as RTF.

### [`clipboard.writeRTF(text[, type])`](#clipboardwritertftext-type)

*   `text` String
*   `type` String (optional)

Writes the `text` into the clipboard in RTF.

### [`clipboard.readBookmark()` _macOS_ _Windows_](#clipboardreadbookmark-macos-windows)

Returns `Object`:

*   `title` String
*   `url` String

Returns an Object containing `title` and `url` keys representing the bookmark in the clipboard. The `title` and `url` values will be empty strings when the bookmark is unavailable.

### [`clipboard.writeBookmark(title, url[, type])` _macOS_ _Windows_](#clipboardwritebookmarktitle-url-type-macos-windows)

*   `title` String
*   `url` String
*   `type` String (optional)

Writes the `title` and `url` into the clipboard as a bookmark.

**Note:** Most apps on Windows don't support pasting bookmarks into them so you can use `clipboard.write` to write both a bookmark and fallback text to the clipboard.

    clipboard.write({
      text: 'https://electronjs.org',
      bookmark: 'Electron Homepage'
    })

### [`clipboard.readFindText()` _macOS_](#clipboardreadfindtext-macos)

Returns `String` - The text on the find pasteboard. This method uses synchronous IPC when called from the renderer process. The cached value is reread from the find pasteboard whenever the application is activated.

### [`clipboard.writeFindText(text)` _macOS_](#clipboardwritefindtexttext-macos)

*   `text` String

Writes the `text` into the find pasteboard as plain text. This method uses synchronous IPC when called from the renderer process.

### [`clipboard.clear([type])`](#clipboardcleartype)

*   `type` String (optional)

Clears the clipboard content.

### [`clipboard.availableFormats([type])`](#clipboardavailableformatstype)

*   `type` String (optional)

Returns `String[]` - An array of supported formats for the clipboard `type`.

### [`clipboard.has(format[, type])` _Experimental_](#clipboardhasformat-type-experimental)

*   `format` String
*   `type` String (optional)

Returns `Boolean` - Whether the clipboard supports the specified `format`.

    const { clipboard } = require('electron')
    console.log(clipboard.has('<p>selection</p>'))

### [`clipboard.read(format)` _Experimental_](#clipboardreadformat-experimental)

*   `format` String

Returns `String` - Reads `format` type from the clipboard.

### [`clipboard.readBuffer(format)` _Experimental_](#clipboardreadbufferformat-experimental)

*   `format` String

Returns `Buffer` - Reads `format` type from the clipboard.

### [`clipboard.writeBuffer(format, buffer[, type])` _Experimental_](#clipboardwritebufferformat-buffer-type-experimental)

*   `format` String
*   `buffer` Buffer
*   `type` String (optional)

Writes the `buffer` into the clipboard as `format`.

### [`clipboard.write(data[, type])`](#clipboardwritedata-type)

*   `data` Object
    
    *   `text` String (optional)
    *   `html` String (optional)
    *   `image` [NativeImage](/docs/api/native-image) (optional)
    *   `rtf` String (optional)
    *   `bookmark` String (optional) - The title of the url at `text`.
*   `type` String (optional)

    const { clipboard } = require('electron')
    clipboard.write({ text: 'test', html: '<b>test</b>' })

Writes `data` to the clipboard.

* * *

[Code Signing](#code-signing)
=============================

Code signing is a security technology that you use to certify that an app was created by you.

On macOS the system can detect any change to the app, whether the change is introduced accidentally or by malicious code.

On Windows the system assigns a trust level to your code signing certificate which if you don't have, or if your trust level is low will cause security dialogs to appear when users start using your application. Trust level builds over time so it's better to start code signing as early as possible.

While it is possible to distribute unsigned apps, it is not recommended. For example, here's what macOS users see when attempting to start an unsigned app:

![unsigned app warning on macOS](https://user-images.githubusercontent.com/2289/39488937-bdc854ba-4d38-11e8-88f8-7b3c125baefc.png)

> App can't be opened because it is from an unidentified developer

If you are building an Electron app that you intend to package and distribute, it should be code signed. The Mac and Windows app stores do not allow unsigned apps.

[Signing macOS builds](#signing-macos-builds)
=============================================

Before signing macOS builds, you must do the following:

1.  Enroll in the [Apple Developer Program](https://developer.apple.com/programs/) (requires an annual fee)
2.  Download and install [Xcode](https://developer.apple.com/xcode)
3.  Generate, download, and install [signing certificates](https://github.com/electron-userland/electron-osx-sign/wiki/1.-Getting-Started#certificates)

There are a number of tools for signing your packaged app:

*   [`electron-osx-sign`](https://github.com/electron-userland/electron-osx-sign) is a standalone tool for signing macOS packages.
*   [`electron-packager`](https://github.com/electron-userland/electron-packager) bundles `electron-osx-sign`. If you're using `electron-packager`, pass the `--osx-sign=true` flag to sign your build.
    
    *   [`electron-forge`](https://github.com/electron-userland/electron-forge) uses `electron-packager` internally, you can set the `osxSign` option in your forge config.
*   [`electron-builder`](https://github.com/electron-userland/electron-builder) has built-in code-signing capabilities. See [electron.build/code-signing](https://www.electron.build/code-signing)

For more info, see the [Mac App Store Submission Guide](/docs/tutorial/mac-app-store-submission-guide).

[Signing Windows builds](#signing-windows-builds)
=================================================

Before signing Windows builds, you must do the following:

1.  Get a Windows Authenticode code signing certificate
2.  Install Visual Studio 2015/2017 (to get the signing utility)

You can get a code signing certificate from a lot of resellers, popular ones include:

*   [digicert](https://www.digicert.com/code-signing/microsoft-authenticode.htm)
*   [Comodo](https://www.comodo.com/landing/ssl-certificate/authenticode-signature/)
*   [GoDaddy](https://au.godaddy.com/web-security/code-signing-certificate)
*   Amongst others, please shop around to find one that suits your needs, Google is your friend :)

There are a number of tools for signing your packaged app:

*   [`electron-winstaller`](https://github.com/electron/windows-installer) will generate an installer for windows and sign it for you
*   [`electron-forge`](https://github.com/electron-userland/electron-forge) can sign installers it generates through the Squirrel.Windows or MSI targets.
*   [`electron-builder`](https://github.com/electron-userland/electron-builder) can sign some of its windows targets

[Windows Store](#windows-store)
-------------------------------

See the [Windows Store Guide](/docs/tutorial/windows-store-guide).

* * *

[Coding Style](#coding-style)
=============================

These are the style guidelines for coding in Electron.

You can run `npm run lint` to show any style issues detected by `cpplint` and `eslint`.

[General Code](#general-code)
-----------------------------

*   End files with a newline.
*   Place requires in the following order:
    
    *   Built in Node Modules (such as `path`)
    *   Built in Electron Modules (such as `ipc`, `app`)
    *   Local Modules (using relative paths)
*   Place class properties in the following order:
    
    *   Class methods and properties (methods starting with a `@`)
    *   Instance methods and properties
*   Avoid platform-dependent code:
    
    *   Use `path.join()` to concatenate filenames.
    *   Use `os.tmpdir()` rather than `/tmp` when you need to reference the temporary directory.
*   Using a plain `return` when returning explicitly at the end of a function.
    
    *   Not `return null`, `return undefined`, `null` or `undefined`

[C++ and Python](#c-and-python)
-------------------------------

For C++ and Python, we follow Chromium's [Coding Style](https://www.chromium.org/developers/coding-style). You can use [clang-format](/docs/development/clang-format) to format the C++ code automatically. There is also a script `script/cpplint.py` to check whether all files conform.

The Python version we are using now is Python 2.7.

The C++ code uses a lot of Chromium's abstractions and types, so it's recommended to get acquainted with them. A good place to start is Chromium's [Important Abstractions and Data Structures](https://www.chromium.org/developers/coding-style/important-abstractions-and-data-structures) document. The document mentions some special types, scoped types (that automatically release their memory when going out of scope), logging mechanisms etc.

[Documentation](#documentation)
-------------------------------

*   Write [remark](https://github.com/remarkjs/remark) markdown style.

You can run `npm run lint-docs` to ensure that your documentation changes are formatted correctly.

[JavaScript](#javascript)
-------------------------

*   Write [standard](https://npm.im/standard) JavaScript style.
*   File names should be concatenated with `-` instead of `_`, e.g. `file-name.js` rather than `file_name.js`, because in [github/atom](https://github.com/github/atom) module names are usually in the `module-name` form. This rule only applies to `.js` files.
*   Use newer ES6/ES2015 syntax where appropriate
    
    *   [`const`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) for requires and other constants
    *   [`let`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let) for defining variables
    *   [Arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) instead of `function () { }`
    *   [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) instead of string concatenation using `+`

[Naming Things](#naming-things)
-------------------------------

Electron APIs uses the same capitalization scheme as Node.js:

*   When the module itself is a class like `BrowserWindow`, use `PascalCase`.
*   When the module is a set of APIs, like `globalShortcut`, use `camelCase`.
*   When the API is a property of object, and it is complex enough to be in a separate chapter like `win.webContents`, use `mixedCase`.
*   For other non-module APIs, use natural titles, like `<webview> Tag` or `Process Object`.

When creating a new API, it is preferred to use getters and setters instead of jQuery's one-function style. For example, `.getText()` and `.setText(text)` are preferred to `.text([text])`. There is a [discussion](https://github.com/electron/electron/issues/46) on this.

* * *

[contentTracing](#contenttracing)
=================================

> Collect tracing data from Chromium's content module for finding performance bottlenecks and slow operations.

Process: [Main](/docs/glossary#main-process)

This module does not include a web interface so you need to open `chrome://tracing/` in a Chrome browser and load the generated file to view the result.

**Note:** You should not use this module until the `ready` event of the app module is emitted.

    const { app, contentTracing } = require('electron')
    
    app.on('ready', () => {
      const options = {
        categoryFilter: '*',
        traceOptions: 'record-until-full,enable-sampling'
      }
    
      contentTracing.startRecording(options, () => {
        console.log('Tracing started')
    
        setTimeout(() => {
          contentTracing.stopRecording('', (path) => {
            console.log('Tracing data recorded to ' + path)
          })
        }, 5000)
      })
    })

[Methods](#methods)
-------------------

The `contentTracing` module has the following methods:

### [`contentTracing.getCategories(callback)`](#contenttracinggetcategoriescallback)

*   `callback` Function
    
    *   `categories` String\[\]

Get a set of category groups. The category groups can change as new code paths are reached.

Once all child processes have acknowledged the `getCategories` request the `callback` is invoked with an array of category groups.

### [`contentTracing.startRecording(options, callback)`](#contenttracingstartrecordingoptions-callback)

*   `options` ([TraceCategoriesAndOptions](/docs/api/structures/trace-categories-and-options) | [TraceConfig](/docs/api/structures/trace-config))
*   `callback` Function

Start recording on all processes.

Recording begins immediately locally and asynchronously on child processes as soon as they receive the EnableRecording request. The `callback` will be called once all child processes have acknowledged the `startRecording` request.

### [`contentTracing.stopRecording(resultFilePath, callback)`](#contenttracingstoprecordingresultfilepath-callback)

*   `resultFilePath` String
*   `callback` Function
    
    *   `resultFilePath` String

Stop recording on all processes.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This helps to minimize the runtime overhead of tracing since sending trace data over IPC can be an expensive operation. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `stopRecording` request, `callback` will be called with a file that contains the traced data.

Trace data will be written into `resultFilePath` if it is not empty or into a temporary file. The actual file path will be passed to `callback` if it's not `null`.

### [`contentTracing.startMonitoring(options, callback)`](#contenttracingstartmonitoringoptions-callback)

*   `options` Object
    
    *   `categoryFilter` String
    *   `traceOptions` String
*   `callback` Function

Start monitoring on all processes.

Monitoring begins immediately locally and asynchronously on child processes as soon as they receive the `startMonitoring` request.

Once all child processes have acknowledged the `startMonitoring` request the `callback` will be called.

### [`contentTracing.stopMonitoring(callback)`](#contenttracingstopmonitoringcallback)

*   `callback` Function

Stop monitoring on all processes.

Once all child processes have acknowledged the `stopMonitoring` request the `callback` is called.

### [`contentTracing.captureMonitoringSnapshot(resultFilePath, callback)`](#contenttracingcapturemonitoringsnapshotresultfilepath-callback)

*   `resultFilePath` String
*   `callback` Function
    
    *   `resultFilePath` String

Get the current monitoring traced data.

Child processes typically cache trace data and only rarely flush and send trace data back to the main process. This is because it may be an expensive operation to send the trace data over IPC and we would like to avoid unneeded runtime overhead from tracing. So, to end tracing, we must asynchronously ask all child processes to flush any pending trace data.

Once all child processes have acknowledged the `captureMonitoringSnapshot` request the `callback` will be called with a file that contains the traced data.

### [`contentTracing.getTraceBufferUsage(callback)`](#contenttracinggettracebufferusagecallback)

*   `callback` Function
    
    *   `value` Number
    *   `percentage` Number

Get the maximum usage across processes of trace buffer as a percentage of the full state. When the TraceBufferUsage value is determined the `callback` is called.

* * *

[Cookie Object](#cookie-object)
===============================

*   `name` String - The name of the cookie.
*   `value` String - The value of the cookie.
*   `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains.
*   `hostOnly` Boolean (optional) - Whether the cookie is a host-only cookie; this will only be `true` if no domain was passed.
*   `path` String (optional) - The path of the cookie.
*   `secure` Boolean (optional) - Whether the cookie is marked as secure.
*   `httpOnly` Boolean (optional) - Whether the cookie is marked as HTTP only.
*   `session` Boolean (optional) - Whether the cookie is a session cookie or a persistent cookie with an expiration date.
*   `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. Not provided for session cookies.

* * *

[Class: Cookies](#class-cookies)
--------------------------------

> Query and modify a session's cookies.

Process: [Main](/docs/glossary#main-process)

Instances of the `Cookies` class are accessed by using `cookies` property of a `Session`.

For example:

    const { session } = require('electron')
    
    // Query all cookies.
    session.defaultSession.cookies.get({}, (error, cookies) => {
      console.log(error, cookies)
    })
    
    // Query all cookies associated with a specific url.
    session.defaultSession.cookies.get({ url: 'http://www.github.com' }, (error, cookies) => {
      console.log(error, cookies)
    })
    
    // Set a cookie with the given cookie data;
    // may overwrite equivalent cookies if they exist.
    const cookie = { url: 'http://www.github.com', name: 'dummy_name', value: 'dummy' }
    session.defaultSession.cookies.set(cookie, (error) => {
      if (error) console.error(error)
    })

### [Instance Events](#instance-events)

The following events are available on instances of `Cookies`:

#### [Event: 'changed'](#event-changed)

*   `event` Event
*   `cookie` [Cookie](/docs/api/structures/cookie) - The cookie that was changed.
*   `cause` String - The cause of the change with one of the following values:
    
    *   `explicit` - The cookie was changed directly by a consumer's action.
    *   `overwrite` - The cookie was automatically removed due to an insert operation that overwrote it.
    *   `expired` - The cookie was automatically removed as it expired.
    *   `evicted` - The cookie was automatically evicted during garbage collection.
    *   `expired-overwrite` - The cookie was overwritten with an already-expired expiration date.
*   `removed` Boolean - `true` if the cookie was removed, `false` otherwise.

Emitted when a cookie is changed because it was added, edited, removed, or expired.

### [Instance Methods](#instance-methods)

The following methods are available on instances of `Cookies`:

#### [`cookies.get(filter, callback)`](#cookiesgetfilter-callback)

*   `filter` Object
    
    *   `url` String (optional) - Retrieves cookies which are associated with `url`. Empty implies retrieving cookies of all urls.
    *   `name` String (optional) - Filters cookies by name.
    *   `domain` String (optional) - Retrieves cookies whose domains match or are subdomains of `domains`.
    *   `path` String (optional) - Retrieves cookies whose path matches `path`.
    *   `secure` Boolean (optional) - Filters cookies by their Secure property.
    *   `session` Boolean (optional) - Filters out session or persistent cookies.
*   `callback` Function
    
    *   `error` Error
    *   `cookies` [Cookie\[\]](/docs/api/structures/cookie) - an array of cookie objects.

Sends a request to get all cookies matching `filter`, `callback` will be called with `callback(error, cookies)` on complete.

#### [`cookies.set(details, callback)`](#cookiessetdetails-callback)

*   `details` Object
    
    *   `url` String - The url to associate the cookie with.
    *   `name` String (optional) - The name of the cookie. Empty by default if omitted.
    *   `value` String (optional) - The value of the cookie. Empty by default if omitted.
    *   `domain` String (optional) - The domain of the cookie; this will be normalized with a preceding dot so that it's also valid for subdomains. Empty by default if omitted.
    *   `path` String (optional) - The path of the cookie. Empty by default if omitted.
    *   `secure` Boolean (optional) - Whether the cookie should be marked as Secure. Defaults to false.
    *   `httpOnly` Boolean (optional) - Whether the cookie should be marked as HTTP only. Defaults to false.
    *   `expirationDate` Double (optional) - The expiration date of the cookie as the number of seconds since the UNIX epoch. If omitted then the cookie becomes a session cookie and will not be retained between sessions.
*   `callback` Function
    
    *   `error` Error

Sets a cookie with `details`, `callback` will be called with `callback(error)` on complete.

#### [`cookies.remove(url, name, callback)`](#cookiesremoveurl-name-callback)

*   `url` String - The URL associated with the cookie.
*   `name` String - The name of cookie to remove.
*   `callback` Function

Removes the cookies matching `url` and `name`, `callback` will called with `callback()` on complete.

#### [`cookies.flushStore(callback)`](#cookiesflushstorecallback)

*   `callback` Function

Writes any unwritten cookies data to disk.

* * *

[CPUUsage Object](#cpuusage-object)
===================================

*   `percentCPUUsage` Number - Percentage of CPU used since the last call to getCPUUsage. First call returns 0.
*   `idleWakeupsPerSecond` Number - The number of average idle cpu wakeups per second since the last call to getCPUUsage. First call returns 0. Will always return 0 on Windows.

* * *

[CrashReport Object](#crashreport-object)
=========================================

*   `date` Date
*   `id` String

* * *

[crashReporter](#crashreporter)
===============================

> Submit crash reports to a remote server.

Process: [Main](/docs/glossary#main-process), [Renderer](/docs/glossary#renderer-process)

The following is an example of automatically submitting a crash report to a remote server:

    const { crashReporter } = require('electron')
    
    crashReporter.start({
      productName: 'YourName',
      companyName: 'YourCompany',
      submitURL: 'https://your-domain.com/url-to-submit',
      uploadToServer: true
    })

For setting up a server to accept and process crash reports, you can use following projects:

*   [socorro](https://github.com/mozilla/socorro)
*   [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Or use a 3rd party hosted solution:

*   [Backtrace I/O](https://backtrace.io/electron/)
*   [Sentry](https://docs.sentry.io/clients/electron)

Crash reports are saved locally in an application-specific temp directory folder. For a `productName` of `YourName`, crash reports will be stored in a folder named `YourName Crashes` inside the temp directory. You can customize this temp directory location for your app by calling the `app.setPath('temp', '/my/custom/temp')` API before starting the crash reporter.

[Methods](#methods)
-------------------

The `crashReporter` module has the following methods:

### [`crashReporter.start(options)`](#crashreporterstartoptions)

*   `options` Object
    
    *   `companyName` String
    *   `submitURL` String - URL that crash reports will be sent to as POST.
    *   `productName` String (optional) - Defaults to `app.getName()`.
    *   `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server Default is `true`.
    *   `ignoreSystemCrashHandler` Boolean (optional) - Default is `false`.
    *   `extra` Object (optional) - An object you can define that will be sent along with the report. Only string properties are sent correctly. Nested objects are not supported and the property names and values must be less than 64 characters long.
    *   `crashesDirectory` String (optional) - Directory to store the crashreports temporarily (only used when the crash reporter is started via `process.crashReporter.start`).

You are required to call this method before using any other `crashReporter` APIs and in each process (main/renderer) from which you want to collect crash reports. You can pass different options to `crashReporter.start` when calling from different processes.

**Note** Child processes created via the `child_process` module will not have access to the Electron modules. Therefore, to collect crash reports from them, use `process.crashReporter.start` instead. Pass the same options as above along with an additional one called `crashesDirectory` that should point to a directory to store the crash reports temporarily. You can test this out by calling `process.crash()` to crash the child process.

**Note:** To collect crash reports from child process in Windows, you need to add this extra code as well. This will start the process that will monitor and send the crash reports. Replace `submitURL`, `productName` and `crashesDirectory` with appropriate values.

**Note:** If you need send additional/updated `extra` parameters after your first call `start` you can call `addExtraParameter` on macOS or call `start` again with the new/updated `extra` parameters on Linux and Windows.

    const args = [
      `--reporter-url=${submitURL}`,
      `--application-name=${productName}`,
      `--crashes-directory=${crashesDirectory}`
    ]
    const env = {
      ELECTRON_INTERNAL_CRASH_SERVICE: 1
    }
    spawn(process.execPath, args, {
      env: env,
      detached: true
    })

**Note:** On macOS, Electron uses a new `crashpad` client for crash collection and reporting. If you want to enable crash reporting, initializing `crashpad` from the main process using `crashReporter.start` is required regardless of which process you want to collect crashes from. Once initialized this way, the crashpad handler collects crashes from all processes. You still have to call `crashReporter.start` from the renderer or child process, otherwise crashes from them will get reported without `companyName`, `productName` or any of the `extra` information.

### [`crashReporter.getLastCrashReport()`](#crashreportergetlastcrashreport)

Returns [`CrashReport`](/docs/api/structures/crash-report):

Returns the date and ID of the last crash report. Only crash reports that have been uploaded will be returned; even if a crash report is present on disk it will not be returned until it is uploaded. In the case that there are no uploaded reports, `null` is returned.

### [`crashReporter.getUploadedReports()`](#crashreportergetuploadedreports)

Returns [`CrashReport[]`](/docs/api/structures/crash-report):

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### [`crashReporter.getUploadToServer()` _Linux_ _macOS_](#crashreportergetuploadtoserver-linux-macos)

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** This API can only be called from the main process.

### [`crashReporter.setUploadToServer(uploadToServer)` _Linux_ _macOS_](#crashreportersetuploadtoserveruploadtoserver-linux-macos)

*   `uploadToServer` Boolean _macOS_ - Whether reports should be submitted to the server.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** This API can only be called from the main process.

### [`crashReporter.addExtraParameter(key, value)` _macOS_](#crashreporteraddextraparameterkey-value-macos)

*   `key` String - Parameter key, must be less than 64 characters long.
*   `value` String - Parameter value, must be less than 64 characters long.

Set an extra parameter to be sent with the crash report. The values specified here will be sent in addition to any values set via the `extra` option when `start` was called. This API is only available on macOS, if you need to add/update extra parameters on Linux and Windows after your first call to `start` you can call `start` again with the updated `extra` options.

### [`crashReporter.removeExtraParameter(key)` _macOS_](#crashreporterremoveextraparameterkey-macos)

*   `key` String - Parameter key, must be less than 64 characters long.

Remove a extra parameter from the current set of parameters so that it will not be sent with the crash report.

### [`crashReporter.getParameters()`](#crashreportergetparameters)

See all of the current parameters being passed to the crash reporter.

[Crash Report Payload](#crash-report-payload)
---------------------------------------------

The crash reporter will send the following data to the `submitURL` as a `multipart/form-data` `POST`:

*   `ver` String - The version of Electron.
*   `platform` String - e.g. 'win32'.
*   `process_type` String - e.g. 'renderer'.
*   `guid` String - e.g. '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
*   `_version` String - The version in `package.json`.
*   `_productName` String - The product name in the `crashReporter` `options` object.
*   `prod` String - Name of the underlying product. In this case Electron.
*   `_companyName` String - The company name in the `crashReporter` `options` object.
*   `upload_file_minidump` File - The crash report in the format of `minidump`.
*   All level one properties of the `extra` object in the `crashReporter` `options` object.

* * *

[Debugging on Windows](#debugging-on-windows)
=============================================

If you experience crashes or issues in Electron that you believe are not caused by your JavaScript application, but instead by Electron itself, debugging can be a little bit tricky, especially for developers not used to native/C++ debugging. However, using Visual Studio, GitHub's hosted Electron Symbol Server, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code.

**See also**: There's a wealth of information on debugging Chromium, much of which also applies to Electron, on the Chromium developers site: [Debugging Chromium on Windows](https://www.chromium.org/developers/how-tos/debugging-on-windows).

[Requirements](#requirements)
-----------------------------

*   **A debug build of Electron**: The easiest way is usually building it yourself, using the tools and prerequisites listed in the [build instructions for Windows](/docs/development/build-instructions-windows). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.
    
*   **Visual Studio with C++ Tools**: The free community editions of Visual Studio 2013 and Visual Studio 2015 both work. Once installed, [configure Visual Studio to use GitHub's Electron Symbol server](/docs/development/setting-up-symbol-server). It will enable Visual Studio to gain a better understanding of what happens inside Electron, making it easier to present variables in a human-readable format.
    
*   **ProcMon**: The [free SysInternals tool](https://technet.microsoft.com/en-us/sysinternals/processmonitor.aspx) allows you to inspect a processes parameters, file handles, and registry operations.
    

[Attaching to and Debugging Electron](#attaching-to-and-debugging-electron)
---------------------------------------------------------------------------

To start a debugging session, open up PowerShell/CMD and execute your debug build of Electron, using the application to open as a parameter.

    $ ./out/Debug/electron.exe ~/my-electron-app/

### [Setting Breakpoints](#setting-breakpoints)

Then, open up Visual Studio. Electron is not built with Visual Studio and hence does not contain a project file - you can however open up the source code files "As File", meaning that Visual Studio will open them up by themselves. You can still set breakpoints - Visual Studio will automatically figure out that the source code matches the code running in the attached process and break accordingly.

Relevant code files can be found in `./atom/`.

### [Attaching](#attaching)

You can attach the Visual Studio debugger to a running process on a local or remote computer. After the process is running, click Debug / Attach to Process (or press `CTRL+ALT+P`) to open the "Attach to Process" dialog box. You can use this capability to debug apps that are running on a local or remote computer, debug multiple processes simultaneously.

If Electron is running under a different user account, select the `Show processes from all users` check box. Notice that depending on how many BrowserWindows your app opened, you will see multiple processes. A typical one-window app will result in Visual Studio presenting you with two `Electron.exe` entries - one for the main process and one for the renderer process. Since the list only gives you names, there's currently no reliable way of figuring out which is which.

### [Which Process Should I Attach to?](#which-process-should-i-attach-to)

Code executed within the main process (that is, code found in or eventually run by your main JavaScript file) as well as code called using the remote (`require('electron').remote`) will run inside the main process, while other code will execute inside its respective renderer process.

You can be attached to multiple programs when you are debugging, but only one program is active in the debugger at any time. You can set the active program in the `Debug Location` toolbar or the `Processes window`.

[Using ProcMon to Observe a Process](#using-procmon-to-observe-a-process)
-------------------------------------------------------------------------

While Visual Studio is fantastic for inspecting specific code paths, ProcMon's strength is really in observing everything your application is doing with the operating system - it captures File, Registry, Network, Process, and Profiling details of processes. It attempts to log **all** events occurring and can be quite overwhelming, but if you seek to understand what and how your application is doing to the operating system, it can be a valuable resource.

For an introduction to ProcMon's basic and advanced debugging features, go check out [this video tutorial](https://channel9.msdn.com/shows/defrag-tools/defrag-tools-4-process-monitor) provided by Microsoft.

* * *

[Class: Debugger](#class-debugger)
----------------------------------

> An alternate transport for Chrome's remote debugging protocol.

Process: [Main](/docs/glossary#main-process)

Chrome Developer Tools has a [special binding](https://developer.chrome.com/devtools/docs/debugger-protocol) available at JavaScript runtime that allows interacting with pages and instrumenting them.

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow()
    
    try {
      win.webContents.debugger.attach('1.1')
    } catch (err) {
      console.log('Debugger attach failed : ', err)
    }
    
    win.webContents.debugger.on('detach', (event, reason) => {
      console.log('Debugger detached due to : ', reason)
    })
    
    win.webContents.debugger.on('message', (event, method, params) => {
      if (method === 'Network.requestWillBeSent') {
        if (params.request.url === 'https://www.github.com') {
          win.webContents.debugger.detach()
        }
      }
    })
    
    win.webContents.debugger.sendCommand('Network.enable')

### [Instance Methods](#instance-methods)

#### [`debugger.attach([protocolVersion])`](#debuggerattachprotocolversion)

*   `protocolVersion` String (optional) - Requested debugging protocol version.

Attaches the debugger to the `webContents`.

#### [`debugger.isAttached()`](#debuggerisattached)

Returns `Boolean` - Whether a debugger is attached to the `webContents`.

#### [`debugger.detach()`](#debuggerdetach)

Detaches the debugger from the `webContents`.

#### [`debugger.sendCommand(method[, commandParams, callback])`](#debuggersendcommandmethod-commandparams-callback)

*   `method` String - Method name, should be one of the methods defined by the remote debugging protocol.
*   `commandParams` Object (optional) - JSON object with request parameters.
*   `callback` Function (optional) - Response
    
    *   `error` Object - Error message indicating the failure of the command.
    *   `result` Any - Response defined by the 'returns' attribute of the command description in the remote debugging protocol.

Send given command to the debugging target.

### [Instance Events](#instance-events)

#### [Event: 'detach'](#event-detach)

*   `event` Event
*   `reason` String - Reason for detaching debugger.

Emitted when debugging session is terminated. This happens either when `webContents` is closed or devtools is invoked for the attached `webContents`.

#### [Event: 'message'](#event-message)

*   `event` Event
*   `method` String - Method name.
*   `params` Object - Event parameters defined by the 'parameters' attribute in the remote debugging protocol.

Emitted whenever debugging target issues instrumentation event.

* * *

[Debugging on macOS](#debugging-on-macos)
=========================================

If you experience crashes or issues in Electron that you believe are not caused by your JavaScript application, but instead by Electron itself, debugging can be a little bit tricky, especially for developers not used to native/C++ debugging. However, using lldb, and the Electron source code, you can enable step-through debugging with breakpoints inside Electron's source code. You can also use [XCode for debugging](/docs/development/debugging-instructions-macos-xcode) if you prefer a graphical interface.

[Requirements](#requirements)
-----------------------------

*   **A debug build of Electron**: The easiest way is usually building it yourself, using the tools and prerequisites listed in the [build instructions for macOS](/docs/development/build-instructions-macos). While you can attach to and debug Electron as you can download it directly, you will find that it is heavily optimized, making debugging substantially more difficult: The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations.
    
*   **Xcode**: In addition to Xcode, also install the Xcode command line tools. They include LLDB, the default debugger in Xcode on Mac OS X. It supports debugging C, Objective-C and C++ on the desktop and iOS devices and simulator.
    

[Attaching to and Debugging Electron](#attaching-to-and-debugging-electron)
---------------------------------------------------------------------------

To start a debugging session, open up Terminal and start `lldb`, passing a debug build of Electron as a parameter.

    $ lldb ./out/Debug/Electron.app
    (lldb) target create "./out/Debug/Electron.app"
    Current executable set to './out/Debug/Electron.app' (x86_64).

### [Setting Breakpoints](#setting-breakpoints)

LLDB is a powerful tool and supports multiple strategies for code inspection. For this basic introduction, let's assume that you're calling a command from JavaScript that isn't behaving correctly - so you'd like to break on that command's C++ counterpart inside the Electron source.

Relevant code files can be found in `./atom/`.

Let's assume that you want to debug `app.setName()`, which is defined in `browser.cc` as `Browser::SetName()`. Set the breakpoint using the `breakpoint` command, specifying file and line to break on:

    (lldb) breakpoint set --file browser.cc --line 117
    Breakpoint 1: where = Electron Framework`atom::Browser::SetName(std::__1::basic_string<char, std::__1::char_traits<char>, std::__1::allocator<char> > const&) + 20 at browser.cc:118, address = 0x000000000015fdb4

Then, start Electron:

    (lldb) run

The app will immediately be paused, since Electron sets the app's name on launch:

    (lldb) run
    Process 25244 launched: '/Users/fr/Code/electron/out/Debug/Electron.app/Contents/MacOS/Electron' (x86_64)
    Process 25244 stopped
    * thread #1: tid = 0x839a4c, 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118, queue = 'com.apple.main-thread', stop reason = breakpoint 1.1
        frame #0: 0x0000000100162db4 Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 20 at browser.cc:118
       115 	}
       116
       117 	void Browser::SetName(const std::string& name) {
    -> 118 	  name_override_ = name;
       119 	}
       120
       121 	int Browser::GetBadgeCount() {
    (lldb)

To show the arguments and local variables for the current frame, run `frame variable` (or `fr v`), which will show you that the app is currently setting the name to "Electron".

    (lldb) frame variable
    (atom::Browser *) this = 0x0000000108b14f20
    (const string &) name = "Electron": {
        [...]
    }

To do a source level single step in the currently selected thread, execute `step` (or `s`). This would take you into `name_override_.empty()`. To proceed and do a step over, run `next` (or `n`).

    (lldb) step
    Process 25244 stopped
    * thread #1: tid = 0x839a4c, 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119, queue = 'com.apple.main-thread', stop reason = step in
        frame #0: 0x0000000100162dcc Electron Framework`atom::Browser::SetName(this=0x0000000108b14f20, name="Electron") + 44 at browser.cc:119
       116
       117 	void Browser::SetName(const std::string& name) {
       118 	  name_override_ = name;
    -> 119 	}
       120
       121 	int Browser::GetBadgeCount() {
       122 	  return badge_count_;

To finish debugging at this point, run `process continue`. You can also continue until a certain line is hit in this thread (`thread until 100`). This command will run the thread in the current frame till it reaches line 100 in this frame or stops if it leaves the current frame.

Now, if you open up Electron's developer tools and call `setName`, you will once again hit the breakpoint.

### [Further Reading](#further-reading)

LLDB is a powerful tool with a great documentation. To learn more about it, consider Apple's debugging documentation, for instance the [LLDB Command Structure Reference](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-basics.html#//apple_ref/doc/uid/TP40012917-CH2-SW2) or the introduction to [Using LLDB as a Standalone Debugger](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-terminal-workflow-tutorial.html).

You can also check out LLDB's fantastic [manual and tutorial](http://lldb.llvm.org/tutorial.html), which will explain more complex debugging scenarios.

* * *

[Debugging with XCode](#debugging-with-xcode)
---------------------------------------------

### [Generate xcode project for debugging sources (cannot build code from xcode)](#generate-xcode-project-for-debugging-sources-cannot-build-code-from-xcode)

Run `gn gen` with the --ide=xcode argument.

    $ gn gen out/Debug --ide=xcode

This will generate the electron.ninja.xcworkspace. You will have to open this workspace to set breakpoints and inspect.

See `gn help gen` for more information on generating IDE projects with GN.

### [Debugging and breakpoints](#debugging-and-breakpoints)

Launch Electron app after build. You can now open the xcode workspace created above and attach to the Electron process through the Debug > Attach To Process > Electron debug menu. \[Note: If you want to debug the renderer process, you need to attach to the Electron Helper as well.\]

You can now set breakpoints in any of the indexed files. However, you will not be able to set breakpoints directly in the Chromium source. To set break points in the Chromium source, you can choose Debug > Breakpoints > Create Symbolic Breakpoint and set any function name as the symbol. This will set the breakpoint for all functions with that name, from all the classes if there are more than one. You can also do this step of setting break points prior to attaching the debugger, however, actual breakpoints for symbolic breakpoint functions may not show up until the debugger is attached to the app.

* * *

[Debugging the Main Process](#debugging-the-main-process)
=========================================================

The DevTools in an Electron browser window can only debug JavaScript that's executed in that window (i.e. the web pages). To debug JavaScript that's executed in the main process you will need to use an external debugger and launch Electron with the `--inspect` or `--inspect-brk` switch.

[Command Line Switches](#command-line-switches)
-----------------------------------------------

Use one of the following command line switches to enable debugging of the main process:

### [`--inspect=[port]`](#--inspectport)

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

    electron --inspect=5858 your/app

### [`--inspect-brk=[port]`](#--inspect-brkport)

Like `--inspect` but pauses execution on the first line of JavaScript.

[External Debuggers](#external-debuggers)
-----------------------------------------

You will need to use a debugger that supports the V8 inspector protocol.

*   Connect Chrome by visiting `chrome://inspect` and selecting to inspect the launched Electron app present there.
*   [Debugging the Main Process in VSCode](/docs/tutorial/debugging-main-process-vscode)

* * *

[Debugging the Main Process in VSCode](#debugging-the-main-process-in-vscode)
=============================================================================

### [1\. Open an Electron project in VSCode.](#1-open-an-electron-project-in-vscode)

    $ git clone git@github.com:electron/electron-quick-start.git
    $ code electron-quick-start

### [2\. Add a file `.vscode/launch.json` with the following configuration:](#2-add-a-file-vscodelaunchjson-with-the-following-configuration)

    {
      "version": "0.2.0",
      "configurations": [
        {
          "name": "Debug Main Process",
          "type": "node",
          "request": "launch",
          "cwd": "${workspaceRoot}",
          "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron",
          "windows": {
            "runtimeExecutable": "${workspaceRoot}/node_modules/.bin/electron.cmd"
          },
          "args" : ["."],
          "outputCapture": "std"
        }
      ]
    }

### [3\. Debugging](#3-debugging)

Set some breakpoints in `main.js`, and start debugging in the [Debug View](https://code.visualstudio.com/docs/editor/debugging). You should be able to hit the breakpoints.

Here is a pre-configured project that you can download and directly debug in VSCode: [https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start](https://github.com/octref/vscode-electron-debug/tree/master/electron-quick-start)

* * *

[desktopCapturer](#desktopcapturer)
===================================

> Access information about media sources that can be used to capture audio and video from the desktop using the [`navigator.mediaDevices.getUserMedia`](https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia) API.

Process: [Renderer](/docs/glossary#renderer-process)

The following example shows how to capture video from a desktop window whose title is `Electron`:

    // In the renderer process.
    const { desktopCapturer } = require('electron')
    
    desktopCapturer.getSources({ types: ['window', 'screen'] }, (error, sources) => {
      if (error) throw error
      for (let i = 0; i < sources.length; ++i) {
        if (sources[i].name === 'Electron') {
          navigator.mediaDevices.getUserMedia({
            audio: false,
            video: {
              mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: sources[i].id,
                minWidth: 1280,
                maxWidth: 1280,
                minHeight: 720,
                maxHeight: 720
              }
            }
          }).then((stream) => handleStream(stream))
            .catch((e) => handleError(e))
          return
        }
      }
    })
    
    function handleStream (stream) {
      const video = document.querySelector('video')
      video.srcObject = stream
      video.onloadedmetadata = (e) => video.play()
    }
    
    function handleError (e) {
      console.log(e)
    }

To capture video from a source provided by `desktopCapturer` the constraints passed to [`navigator.mediaDevices.getUserMedia`](https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia) must include `chromeMediaSource: 'desktop'`, and `audio: false`.

To capture both audio and video from the entire desktop the constraints passed to [`navigator.mediaDevices.getUserMedia`](https://developer.mozilla.org/en/docs/Web/API/MediaDevices/getUserMedia) must include `chromeMediaSource: 'desktop'`, for both `audio` and `video`, but should not include a `chromeMediaSourceId` constraint.

    const constraints = {
      audio: {
        mandatory: {
          chromeMediaSource: 'desktop'
        }
      },
      video: {
        mandatory: {
          chromeMediaSource: 'desktop'
        }
      }
    }

[Methods](#methods)
-------------------

The `desktopCapturer` module has the following methods:

### [`desktopCapturer.getSources(options, callback)`](#desktopcapturergetsourcesoptions-callback)

*   `options` Object
    
    *   `types` String\[\] - An array of Strings that lists the types of desktop sources to be captured, available types are `screen` and `window`.
    *   `thumbnailSize` [Size](/docs/api/structures/size) (optional) - The size that the media source thumbnail should be scaled to. Default is `150` x `150`.
*   `callback` Function
    
    *   `error` Error
    *   `sources` [DesktopCapturerSource\[\]](/docs/api/structures/desktop-capturer-source)

Starts gathering information about all available desktop media sources, and calls `callback(error, sources)` when finished.

`sources` is an array of [`DesktopCapturerSource`](/docs/api/structures/desktop-capturer-source) objects, each `DesktopCapturerSource` represents a screen or an individual window that can be captured.

* * *

[DesktopCapturerSource Object](#desktopcapturersource-object)
=============================================================

*   `id` String - The identifier of a window or screen that can be used as a `chromeMediaSourceId` constraint when calling \[`navigator.webkitGetUserMedia`\]. The format of the identifier will be `window:XX` or `screen:XX`, where `XX` is a random generated number.
*   `name` String - A screen source will be named either `Entire Screen` or `Screen <index>`, while the name of a window source will match the window title.
*   `thumbnail` [NativeImage](/docs/api/native-image) - A thumbnail image. **Note:** There is no guarantee that the size of the thumbnail is the same as the `thumbnailSize` specified in the `options` passed to `desktopCapturer.getSources`. The actual size depends on the scale of the screen or window.
*   `display_id` String - A unique identifier that will correspond to the `id` of the matching [Display](/docs/api/structures/display) returned by the [Screen API](/docs/api/screen). On some platforms, this is equivalent to the `XX` portion of the `id` field above and on others it will differ. It will be an empty string if not available.

* * *

[Desktop Environment Integration](#desktop-environment-integration)
===================================================================

Different operating systems provide different features for integrating desktop applications into their desktop environments. For example, on Windows, applications can put shortcuts in the JumpList of task bar, and on Mac, applications can put a custom menu in the dock menu.

This guide explains how to integrate your application into those desktop environments with Electron APIs.

[Notifications](#notifications)
-------------------------------

See the [Notifications documentation](/docs/tutorial/notifications).

[Recent Documents](#recent-documents)
-------------------------------------

See [Recent Documents documentation](/docs/tutorial/recent-documents).

[Progress Bar](#progress-bar)
-----------------------------

See the [Progress Bar documentation](/docs/tutorial/progress-bar).

[Unity Launcher](#unity-launcher)
---------------------------------

See the [Unity Launcher documentation](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher).

[Represented File for macOS Window](#represented-file-for-macos-window)
-----------------------------------------------------------------------

See the [Represented File documentation](/docs/tutorial/represented-file).

[Dragging files out of the window](#dragging-files-out-of-the-window)
---------------------------------------------------------------------

See the [Native File Drag & Drop documentation](/docs/tutorial/native-file-drag-drop).

* * *

[Developer Environment](#developer-environment)
===============================================

Electron development is essentially Node.js development. To turn your operating system into an environment capable of building desktop apps with Electron, you will merely need Node.js, npm, a code editor of your choice, and a rudimentary understanding of your operating system's command line client.

[Setting up macOS](#setting-up-macos)
-------------------------------------

> Electron supports macOS 10.10 (Yosemite) and up. Apple does not allow running macOS in virtual machines unless the host computer is already an Apple computer, so if you find yourself in need of a Mac, consider using a cloud service that rents access to Macs (like [MacInCloud](https://www.macincloud.com/) or [xcloud](https://xcloud.me)).

First, install a recent version of Node.js. We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `macOS Installer`. While Homebrew is an offered option, but we recommend against it - many tools will be incompatible with the way Homebrew installs Node.js.

Once downloaded, execute the installer and let the installation wizard guide you through the installation.

Once installed, confirm that everything works as expected. Find the macOS `Terminal` application in your `/Applications/Utilities` folder (or by searching for the word `Terminal` in Spotlight). Open up `Terminal` or another command line client of your choice and confirm that both `node` and `npm` are available:

    # This command should print the version of Node.js
    node -v
    
    # This command should print the version of npm
    npm -v

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

[Setting up Windows](#setting-up-windows)
-----------------------------------------

> Electron supports Windows 7 and later versions – attempting to develop Electron applications on earlier versions of Windows will not work. Microsoft provides free [virtual machine images with Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) for developers.

First, install a recent version of Node.js. We recommend that you install either the latest `LTS` or `Current` version available. Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. Once downloaded, execute the installer and let the installation wizard guide you through the installation.

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

Once installed, confirm that everything works as expected. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

    # This command should print the version of Node.js
    node -v
    
    # This command should print the version of npm
    npm -v

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

[Setting up Linux](#setting-up-linux)
-------------------------------------

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

First, install a recent version of Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

    # This command should print the version of Node.js
    node -v
    
    # This command should print the version of npm
    npm -v

If both commands printed a version number, you are all set! Before you get started, you might want to install a [code editor](#a-good-editor) suited for JavaScript development.

[A Good Editor](#a-good-editor)
-------------------------------

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.

* * *

[DevTools Extension](#devtools-extension)
=========================================

Electron supports the [Chrome DevTools Extension](https://developer.chrome.com/extensions/devtools), which can be used to extend the ability of devtools for debugging popular web frameworks.

[How to load a DevTools Extension](#how-to-load-a-devtools-extension)
---------------------------------------------------------------------

This document outlines the process for manually loading an extension. You may also try [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), a third-party tool that downloads extensions directly from the Chrome WebStore.

To load an extension in Electron, you need to download it in Chrome browser, locate its filesystem path, and then load it by calling the `BrowserWindow.addDevToolsExtension(extension)` API.

Using the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) as example:

1.  Install it in Chrome browser.
    
2.  Navigate to `chrome://extensions`, and find its extension ID, which is a hash string like `fmkadmapgofadopljbjfkapdkoienihi`.
    
3.  Find out filesystem location used by Chrome for storing extensions:
    
    *   on Windows it is `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
    *   on Linux it could be:
        
        *   `~/.config/google-chrome/Default/Extensions/`
        *   `~/.config/google-chrome-beta/Default/Extensions/`
        *   `~/.config/google-chrome-canary/Default/Extensions/`
        *   `~/.config/chromium/Default/Extensions/`
    *   on macOS it is `~/Library/Application Support/Google/Chrome/Default/Extensions`.
4.  Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like:
    
        const path = require('path')
        const os = require('os')
        
        BrowserWindow.addDevToolsExtension(
           path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0')
        )
    

**Note:** The `BrowserWindow.addDevToolsExtension` API cannot be called before the ready event of the app module is emitted.

The name of the extension is returned by `BrowserWindow.addDevToolsExtension`, and you can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to unload it.

[Supported DevTools Extensions](#supported-devtools-extensions)
---------------------------------------------------------------

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Following Devtools Extensions are tested and guaranteed to work in Electron:

*   [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
*   [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
*   [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
*   [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
*   [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
*   [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
*   [Cerebral Debugger](https://cerebraljs.com/docs/introduction/debugger.html)
*   [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
*   [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### [What should I do if a DevTools Extension is not working?](#what-should-i-do-if-a-devtools-extension-is-not-working)

First please make sure the extension is still being maintained, some extensions can not even work for recent versions of Chrome browser, and we are not able to do anything for them.

Then file a bug at Electron's issues list, and describe which part of the extension is not working as expected.

* * *

[dialog](#dialog)
=================

> Display native system dialogs for opening and saving files, alerting, etc.

Process: [Main](/docs/glossary#main-process)

An example of showing a dialog to select multiple files and directories:

    const { dialog } = require('electron')
    console.log(dialog.showOpenDialog({ properties: ['openFile', 'openDirectory', 'multiSelections'] }))

The Dialog is opened from Electron's main thread. If you want to use the dialog object from a renderer process, remember to access it using the remote:

    const { dialog } = require('electron').remote
    console.log(dialog)

[Methods](#methods)
-------------------

The `dialog` module has the following methods:

### [`dialog.showOpenDialog([browserWindow, ]options[, callback])`](#dialogshowopendialogbrowserwindow-options-callback)

*   `browserWindow` [BrowserWindow](/docs/api/browser-window) (optional)
*   `options` Object
    
    *   `title` String (optional)
    *   `defaultPath` String (optional)
    *   `buttonLabel` String (optional) - Custom label for the confirmation button, when left empty the default label will be used.
    *   `filters` [FileFilter\[\]](/docs/api/structures/file-filter) (optional)
    *   `properties` String[](/docs/api/optional) - Contains which features the dialog should use. The following values are supported:
        
        *   `openFile` - Allow files to be selected.
        *   `openDirectory` - Allow directories to be selected.
        *   `multiSelections` - Allow multiple paths to be selected.
        *   `showHiddenFiles` - Show hidden files in dialog.
        *   `createDirectory` _macOS_ - Allow creating new directories from dialog.
        *   `promptToCreate` _Windows_ - Prompt for creation if the file path entered in the dialog does not exist. This does not actually create the file at the path but allows non-existent paths to be returned that should be created by the application.
        *   `noResolveAliases` _macOS_ - Disable the automatic alias (symlink) path resolution. Selected aliases will now return the alias path instead of their target path.
        *   `treatPackageAsDirectory` _macOS_ - Treat packages, such as `.app` folders, as a directory instead of a file.
    *   `message` String (optional) _macOS_ - Message to display above input boxes.
    *   `securityScopedBookmarks` Boolean (optional) _masOS_ _mas_ - Create [security scoped bookmarks](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store.
*   `callback` Function (optional)
    
    *   `filePaths` String\[\] - An array of file paths chosen by the user
    *   `bookmarks` String\[\] _macOS_ _mas_ - An array matching the `filePaths` array of base64 encoded strings which contains security scoped bookmark data. `securityScopedBookmarks` must be enabled for this to be populated.

Returns `String[] | undefined`, an array of file paths chosen by the user, if the callback is provided it returns `undefined`.

The `browserWindow` argument allows the dialog to attach itself to a parent window, making it modal.

The `filters` specifies an array of file types that can be displayed or selected when you want to limit the user to a specific type. For example:

    {
      filters: [
        { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
        { name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
        { name: 'Custom File Type', extensions: ['as'] },
        { name: 'All Files', extensions: ['*'] }
      ]
    }

The `extensions` array should contain extensions without wildcards or dots (e.g. `'png'` is good but `'.png'` and `'*.png'` are bad). To show all files, use the `'*'` wildcard (no other wildcard is supported).

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filenames)`.

**Note:** On Windows and Linux an open dialog can not be both a file selector and a directory selector, so if you set `properties` to `['openFile', 'openDirectory']` on these platforms, a directory selector will be shown.

### [`dialog.showSaveDialog([browserWindow, ]options[, callback])`](#dialogshowsavedialogbrowserwindow-options-callback)

*   `browserWindow` [BrowserWindow](/docs/api/browser-window) (optional)
*   `options` Object
    
    *   `title` String (optional)
    *   `defaultPath` String (optional) - Absolute directory path, absolute file path, or file name to use by default.
    *   `buttonLabel` String (optional) - Custom label for the confirmation button, when left empty the default label will be used.
    *   `filters` [FileFilter\[\]](/docs/api/structures/file-filter) (optional)
    *   `message` String (optional) _macOS_ - Message to display above text fields.
    *   `nameFieldLabel` String (optional) _macOS_ - Custom label for the text displayed in front of the filename text field.
    *   `showsTagField` Boolean (optional) _macOS_ - Show the tags input box, defaults to `true`.
    *   `securityScopedBookmarks` Boolean (optional) _masOS_ _mas_ - Create a [security scoped bookmark](https://developer.apple.com/library/content/documentation/Security/Conceptual/AppSandboxDesignGuide/AppSandboxInDepth/AppSandboxInDepth.html#//apple_ref/doc/uid/TP40011183-CH3-SW16) when packaged for the Mac App Store. If this option is enabled and the file doesn't already exist a blank file will be created at the chosen path.
*   `callback` Function (optional)
    
    *   `filename` String
    *   `bookmark` String _macOS_ _mas_ - Base64 encoded string which contains the security scoped bookmark data for the saved file. `securityScopedBookmarks` must be enabled for this to be present.

Returns `String | undefined`, the path of the file chosen by the user, if a callback is provided or the dialog is cancelled it returns `undefined`.

The `browserWindow` argument allows the dialog to attach itself to a parent window, making it modal.

The `filters` specifies an array of file types that can be displayed, see `dialog.showOpenDialog` for an example.

If a `callback` is passed, the API call will be asynchronous and the result will be passed via `callback(filename)`.

### [`dialog.showMessageBox([browserWindow, ]options[, callback])`](#dialogshowmessageboxbrowserwindow-options-callback)

*   `browserWindow` [BrowserWindow](/docs/api/browser-window) (optional)
*   `options` Object
    
    *   `type` String (optional) - Can be `"none"`, `"info"`, `"error"`, `"question"` or `"warning"`. On Windows, `"question"` displays the same icon as `"info"`, unless you set an icon using the `"icon"` option. On macOS, both `"warning"` and `"error"` display the same warning icon.
    *   `buttons` String[](/docs/api/optional) - Array of texts for buttons. On Windows, an empty array will result in one button labeled "OK".
    *   `defaultId` Integer (optional) - Index of the button in the buttons array which will be selected by default when the message box opens.
    *   `title` String (optional) - Title of the message box, some platforms will not show it.
    *   `message` String - Content of the message box.
    *   `detail` String (optional) - Extra information of the message.
    *   `checkboxLabel` String (optional) - If provided, the message box will include a checkbox with the given label. The checkbox state can be inspected only when using `callback`.
    *   `checkboxChecked` Boolean (optional) - Initial checked state of the checkbox. `false` by default.
    *   `icon` [NativeImage](/docs/api/native-image) (optional)
    *   `cancelId` Integer (optional) - The index of the button to be used to cancel the dialog, via the `Esc` key. By default this is assigned to the first button with "cancel" or "no" as the label. If no such labeled buttons exist and this option is not set, `0` will be used as the return value or callback response.
    *   `noLink` Boolean (optional) - On Windows Electron will try to figure out which one of the `buttons` are common buttons (like "Cancel" or "Yes"), and show the others as command links in the dialog. This can make the dialog appear in the style of modern Windows apps. If you don't like this behavior, you can set `noLink` to `true`.
    *   `normalizeAccessKeys` Boolean (optional) - Normalize the keyboard access keys across platforms. Default is `false`. Enabling this assumes `&` is used in the button labels for the placement of the keyboard shortcut access key and labels will be converted so they work correctly on each platform, `&` characters are removed on macOS, converted to `_` on Linux, and left untouched on Windows. For example, a button label of `Vie&w` will be converted to `Vie_w` on Linux and `View` on macOS and can be selected via `Alt-W` on Windows and Linux.
*   `callback` Function (optional)
    
    *   `response` Number - The index of the button that was clicked.
    *   `checkboxChecked` Boolean - The checked state of the checkbox if `checkboxLabel` was set. Otherwise `false`.

Returns `Integer`, the index of the clicked button, if a callback is provided it returns undefined.

Shows a message box, it will block the process until the message box is closed. It returns the index of the clicked button.

The `browserWindow` argument allows the dialog to attach itself to a parent window, making it modal.

If a `callback` is passed, the dialog will not block the process. The API call will be asynchronous and the result will be passed via `callback(response)`.

### [`dialog.showErrorBox(title, content)`](#dialogshowerrorboxtitle-content)

*   `title` String - The title to display in the error box.
*   `content` String - The text content to display in the error box.

Displays a modal dialog that shows an error message.

This API can be called safely before the `ready` event the `app` module emits, it is usually used to report errors in early stage of startup. If called before the app `ready`event on Linux, the message will be emitted to stderr, and no GUI dialog will appear.

### [`dialog.showCertificateTrustDialog([browserWindow, ]options, callback)` _macOS_ _Windows_](#dialogshowcertificatetrustdialogbrowserwindow-options-callback-macos-windows)

*   `browserWindow` [BrowserWindow](/docs/api/browser-window) (optional)
*   `options` Object
    
    *   `certificate` [Certificate](/docs/api/structures/certificate) - The certificate to trust/import.
    *   `message` String - The message to display to the user.
*   `callback` Function

On macOS, this displays a modal dialog that shows a message and certificate information, and gives the user the option of trusting/importing the certificate. If you provide a `browserWindow` argument the dialog will be attached to the parent window, making it modal.

On Windows the options are more limited, due to the Win32 APIs used:

*   The `message` argument is not used, as the OS provides its own confirmation dialog.
*   The `browserWindow` argument is ignored since it is not possible to make this confirmation dialog modal.

[Sheets](#sheets)
-----------------

On macOS, dialogs are presented as sheets attached to a window if you provide a [`BrowserWindow`](/docs/api/browser-window) reference in the `browserWindow` parameter, or modals if no window is provided.

You can call `BrowserWindow.getCurrentWindow().setSheetOffset(offset)` to change the offset from the window frame where sheets are attached.

* * *

[Display Object](#display-object)
=================================

*   `id` Number - Unique identifier associated with the display.
*   `rotation` Number - Can be 0, 90, 180, 270, represents screen rotation in clock-wise degrees.
*   `scaleFactor` Number - Output device's pixel scale factor.
*   `touchSupport` String - Can be `available`, `unavailable`, `unknown`.
*   `bounds` [Rectangle](/docs/api/structures/rectangle)
*   `size` [Size](/docs/api/structures/size)
*   `workArea` [Rectangle](/docs/api/structures/rectangle)
*   `workAreaSize` [Size](/docs/api/structures/size)

The `Display` object represents a physical display connected to the system. A fake `Display` may exist on a headless system, or a `Display` may correspond to a remote, virtual display.

* * *

[Class: DownloadItem](#class-downloaditem)
------------------------------------------

> Control file downloads from remote sources.

Process: [Main](/docs/glossary#main-process)

`DownloadItem` is an `EventEmitter` that represents a download item in Electron. It is used in `will-download` event of `Session` class, and allows users to control the download item.

    // In the main process.
    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow()
    win.webContents.session.on('will-download', (event, item, webContents) => {
      // Set the save path, making Electron not to prompt a save dialog.
      item.setSavePath('/tmp/save.pdf')
    
      item.on('updated', (event, state) => {
        if (state === 'interrupted') {
          console.log('Download is interrupted but can be resumed')
        } else if (state === 'progressing') {
          if (item.isPaused()) {
            console.log('Download is paused')
          } else {
            console.log(`Received bytes: ${item.getReceivedBytes()}`)
          }
        }
      })
      item.once('done', (event, state) => {
        if (state === 'completed') {
          console.log('Download successfully')
        } else {
          console.log(`Download failed: ${state}`)
        }
      })
    })

### [Instance Events](#instance-events)

#### [Event: 'updated'](#event-updated)

Returns:

*   `event` Event
*   `state` String - Can be `progressing` or `interrupted`.

Emitted when the download has been updated and is not done.

The `state` can be one of following:

*   `progressing` - The download is in-progress.
*   `interrupted` - The download has interrupted and can be resumed.

#### [Event: 'done'](#event-done)

Returns:

*   `event` Event
*   `state` String - Can be `completed`, `cancelled` or `interrupted`.

Emitted when the download is in a terminal state. This includes a completed download, a cancelled download (via `downloadItem.cancel()`), and interrupted download that can't be resumed.

The `state` can be one of following:

*   `completed` - The download completed successfully.
*   `cancelled` - The download has been cancelled.
*   `interrupted` - The download has interrupted and can not resume.

### [Instance Methods](#instance-methods)

The `downloadItem` object has the following methods:

#### [`downloadItem.setSavePath(path)`](#downloaditemsetsavepathpath)

*   `path` String - Set the save file path of the download item.

The API is only available in session's `will-download` callback function. If user doesn't set the save path via the API, Electron will use the original routine to determine the save path(Usually prompts a save dialog).

#### [`downloadItem.getSavePath()`](#downloaditemgetsavepath)

Returns `String` - The save path of the download item. This will be either the path set via `downloadItem.setSavePath(path)` or the path selected from the shown save dialog.

#### [`downloadItem.pause()`](#downloaditempause)

Pauses the download.

#### [`downloadItem.isPaused()`](#downloaditemispaused)

Returns `Boolean` - Whether the download is paused.

#### [`downloadItem.resume()`](#downloaditemresume)

Resumes the download that has been paused.

**Note:** To enable resumable downloads the server you are downloading from must support range requests and provide both `Last-Modified` and `ETag` header values. Otherwise `resume()` will dismiss previously received bytes and restart the download from the beginning.

#### [`downloadItem.canResume()`](#downloaditemcanresume)

Returns `Boolean` - Whether the download can resume.

#### [`downloadItem.cancel()`](#downloaditemcancel)

Cancels the download operation.

#### [`downloadItem.getURL()`](#downloaditemgeturl)

Returns `String` - The origin url where the item is downloaded from.

#### [`downloadItem.getMimeType()`](#downloaditemgetmimetype)

Returns `String` - The files mime type.

#### [`downloadItem.hasUserGesture()`](#downloaditemhasusergesture)

Returns `Boolean` - Whether the download has user gesture.

#### [`downloadItem.getFilename()`](#downloaditemgetfilename)

Returns `String` - The file name of the download item.

**Note:** The file name is not always the same as the actual one saved in local disk. If user changes the file name in a prompted download saving dialog, the actual name of saved file will be different.

#### [`downloadItem.getTotalBytes()`](#downloaditemgettotalbytes)

Returns `Integer` - The total size in bytes of the download item.

If the size is unknown, it returns 0.

#### [`downloadItem.getReceivedBytes()`](#downloaditemgetreceivedbytes)

Returns `Integer` - The received bytes of the download item.

#### [`downloadItem.getContentDisposition()`](#downloaditemgetcontentdisposition)

Returns `String` - The Content-Disposition field from the response header.

#### [`downloadItem.getState()`](#downloaditemgetstate)

Returns `String` - The current state. Can be `progressing`, `completed`, `cancelled` or `interrupted`.

**Note:** The following methods are useful specifically to resume a `cancelled` item when session is restarted.

#### [`downloadItem.getURLChain()`](#downloaditemgeturlchain)

Returns `String[]` - The complete url chain of the item including any redirects.

#### [`downloadItem.getLastModifiedTime()`](#downloaditemgetlastmodifiedtime)

Returns `String` - Last-Modified header value.

#### [`downloadItem.getETag()`](#downloaditemgetetag)

Returns `String` - ETag header value.

#### [`downloadItem.getStartTime()`](#downloaditemgetstarttime)

Returns `Double` - Number of seconds since the UNIX epoch when the download was started.

* * *

[5.0.0 Release Schedule](#500-release-schedule)
-----------------------------------------------

Take a look at 5.0.0 Timeline [blog post](https://electronjs.org/blog/electron-5-0-timeline) for info about publicizing our release dates.

#### [Notes:](#notes)

*   These dates are our goals but there may be reasons for adjusting the stable deadline, such as security bugs.
*   These are our scheduled beta releases, however we often release more betas than scheduled.

Date/Week Of

Release

Comments

Tue, 2019-Jan-22

5.0.0-beta.1

🔥

Tue, 2019-Jan-29

5.0.0-beta.x

Tue, 2019-Feb-05

5.0.0-beta.x

Last Date to Join [AFP](https://electronjs.org/blog/app-feedback-program)

Tue, 2019-Feb-12

5.0.0-beta.x

Tue, 2019-Feb-19

none

Maintainers Summit

Tue, 2019-Feb-26

5.0.0-beta.x

Tue, 2019-Mar-05

5.0.0-beta.x

halfway mark

Tue, 2019-Mar-12

5.0.0-beta.x

Tue, 2019-Mar-19

5.0.0-beta.x

Tue, 2019-Mar-26

5.0.0-beta.x

Tue, 2019-Apr-02

5.0.0-beta.x

Tue, 2019-Apr-09

5.0.0-beta.x

Tue, 2019-Apr-16

none

quiet period - stable prep

Tue, 2019-Apr-23

5.0.0

✨stable ✨

Includes: Chromium M73 and Node v12.0

[6.0.0 Release Schedule](#600-release-schedule)
-----------------------------------------------

TBD

* * *

[Electron Versioning](#electron-versioning)
===========================================

> A detailed look at our versioning policy and implementation.

As of version 2.0.0, Electron follows [semver](#semver). The following command will install the most recent stable build of Electron:

    npm install --save-dev electron

To update an existing project to use the latest stable version:

    npm install --save-dev electron@latest

[Version 1.x](#version-1x)
--------------------------

Electron versions _< 2.0_ did not conform to the [semver](http://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. While convenient for developers merging features, it creates problems for developers of client-facing applications. The QA testing cycles of major apps like Slack, Stride, Teams, Skype, VS Code, Atom, and Desktop can be lengthy and stability is a highly desired outcome. There is a high risk in adopting new features while trying to absorb bug fixes.

Here is an example of the 1.x strategy:

![](https://cdn.rawgit.com/electron/electron/e7c48922e77b0043f2d829b4e8c44c0d2b45d500//docs/images/versioning-sketch-0.png)

An app developed with `1.8.1` cannot take the `1.8.3` bug fix without either absorbing the `1.8.2` feature, or by backporting the fix and maintaining a new release line.

[Version 2.0 and Beyond](#version-20-and-beyond)
------------------------------------------------

There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.

1.  Strict use of semver
2.  Introduction of semver-compliant `-beta` tags
3.  Introduction of [conventional commit messages](https://conventionalcommits.org/)
4.  Well-defined stabilization branches
5.  The `master` branch is versionless; only stabilization branches contain version information

We will cover in detail how git branching works, how npm tagging works, what developers should expect to see, and how one can backport changes.

[semver](#semver)
=================

From 2.0 onward, Electron will follow semver.

Below is a table explicitly mapping types of changes to their corresponding category of semver (e.g. Major, Minor, Patch).

Major Version Increments

Minor Version Increments

Patch Version Increments

Electron breaking API changes

Electron non-breaking API changes

Electron bug fixes

Node.js major version updates

Node.js minor version updates

Node.js patch version updates

Chromium version updates

fix-related chromium patches

Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

[Stabilization Branches](#stabilization-branches)
=================================================

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](https://cdn.rawgit.com/electron/electron/e7c48922e77b0043f2d829b4e8c44c0d2b45d500//docs/images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

We allow for multiple stabilization branches to exist simultaneously, and intend to support at least two in parallel at all times, backporting security fixes as necessary. ![](https://cdn.rawgit.com/electron/electron/e7c48922e77b0043f2d829b4e8c44c0d2b45d500//docs/images/versioning-sketch-2.png)

Older lines will not be supported by GitHub, but other groups can take ownership and backport stability and security fixes on their own. We discourage this, but recognize that it makes life easier for many app developers.

[Beta Releases and Bug Fixes](#beta-releases-and-bug-fixes)
===========================================================

Developers want to know which releases are _safe_ to use. Even seemingly innocent features can introduce regressions in complex applications. At the same time, locking to a fixed version is dangerous because you’re ignoring security patches and bug fixes that may have come out since your version. Our goal is to allow the following standard semver ranges in `package.json` :

*   Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
*   Use `^2.0.0` to admit non-breaking _reasonably stable_ feature work as well as security and bug fixes.

What’s important about the second point is that apps using `^` should still be able to expect a reasonable level of stability. To accomplish this, semver allows for a _pre-release identifier_ to indicate a particular version is not yet _safe_ or _stable_.

Whatever you choose, you will periodically have to bump the version in your `package.json` as breaking changes are a fact of Chromium life.

The process is as follows:

1.  All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. After the first beta, subsequent beta releases must meet all of the following conditions:
    
    1.  The change is backwards API-compatible (deprecations are allowed)
    2.  The risk to meeting our stability timeline must be low.
2.  If allowed changes need to be made once a release is beta, they are applied and the prerelease tag is incremented, e.g. `2.0.0-beta.2`.
3.  If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`. After the first stable, all changes must be backwards-compatible bug or security fixes.
4.  If future bug fixes or security patches need to be made once a release is stable, they are applied and the _patch_ version is incremented e.g. `2.0.1`.

Specifically, the above means:

1.  Admitting non-breaking-API changes early in the beta cycle is okay, even if those changes have the potential to cause moderate side-affects
2.  Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3.  Admitting features of any sort very late in the beta cycle is 👎 without a very good reason.

For each major and minor bump, you should expect to see something like the following:

    2.0.0-beta.1
    2.0.0-beta.2
    2.0.0-beta.3
    2.0.0
    2.0.1
    2.0.2

An example lifecycle in pictures:

*   A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](https://cdn.rawgit.com/electron/electron/e7c48922e77b0043f2d829b4e8c44c0d2b45d500//docs/images/versioning-sketch-3.png)
*   A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](https://cdn.rawgit.com/electron/electron/e7c48922e77b0043f2d829b4e8c44c0d2b45d500//docs/images/versioning-sketch-4.png)
*   The beta is considered _generally stable_ and it is published again as a non-beta under `2.0.0`. ![](https://cdn.rawgit.com/electron/electron/e7c48922e77b0043f2d829b4e8c44c0d2b45d500//docs/images/versioning-sketch-5.png)
*   Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](https://cdn.rawgit.com/electron/electron/e7c48922e77b0043f2d829b4e8c44c0d2b45d500//docs/images/versioning-sketch-6.png)

A few examples of how various semver ranges will pick up new releases:

![](https://cdn.rawgit.com/electron/electron/e7c48922e77b0043f2d829b4e8c44c0d2b45d500//docs/images/versioning-sketch-7.png)

[Missing Features: Alphas](#missing-features-alphas)
====================================================

Our strategy has a few tradeoffs, which for now we feel are appropriate. Most importantly that new features in master may take a while before reaching a stable release line. If you want to try a new feature immediately, you will have to build Electron yourself.

As a future consideration, we may introduce one or both of the following:

*   alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in _alpha_

[Feature Flags](#feature-flags)
===============================

Feature flags are a common practice in Chromium, and are well-established in the web-development ecosystem. In the context of Electron, a feature flag or **soft branch** must have the following properties:

*   it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
*   it completely segments new and old code paths; refactoring old code to support a new feature _violates_ the feature-flag contract
*   feature flags are eventually removed after the feature is released

[Semantic Commits](#semantic-commits)
=====================================

We seek to increase clarity at all levels of the update and releases process. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

*   Commits that would result in a semver **major** bump must start their body with `BREAKING CHANGE:`.
    
*   Commits that would result in a semver **minor** bump must start with `feat:`.
    
*   Commits that would result in a semver **patch** bump must start with `fix:`.
    
*   We allow squashing of commits, provided that the squashed message adheres the the above message format.
    
*   It is acceptable for some commits in a pull request to not include a semantic prefix, as long as the pull request title contains a meaningful encompassing semantic message.
    

[Versioned `master`](#versioned-master)
=======================================

*   The `master` branch will always contain the next major version `X.0.0-nightly.DATE` in its `package.json`
*   Release branches are never merged back to master
*   Release branches _do_ contain the correct version in their `package.json`
*   As soon as a release branch is cut for a major, master must be bumped to the next major. I.e. `master` is always versioned as the next theoretical release branch

* * *

[Environment Variables](#environment-variables)
===============================================

> Control application configuration and behavior without changing code.

Certain Electron behaviors are controlled by environment variables because they are initialized earlier than the command line flags and the app's code.

POSIX shell example:

    $ export ELECTRON_ENABLE_LOGGING=true
    $ electron

Windows console example:

    > set ELECTRON_ENABLE_LOGGING=true
    > electron

[Production Variables](#production-variables)
---------------------------------------------

The following environment variables are intended primarily for use at runtime in packaged Electron applications.

### [`NODE_OPTIONS`](#node_options)

Electron includes support for a subset of Node's [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options). The majority are supported with the exception of those which conflict with Chromium's use of BoringSSL.

Example:

    export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"

Unsupported options are:

    --use-bundled-ca
    --force-fips
    --enable-fips
    --openssl-config
    --use-openssl-ca

`NODE_OPTIONS` are explicitly disallowed in packaged apps.

### [`GOOGLE_API_KEY`](#google_api_key)

Electron includes a hardcoded API key for making requests to Google's geocoding webservice. Because this API key is included in every version of Electron, it often exceeds its usage quota. To work around this, you can supply your own Google API key in the environment. Place the following code in your main process file, before opening any browser windows that will make geocoding requests:

    process.env.GOOGLE_API_KEY = 'YOUR_KEY_HERE'

For instructions on how to acquire a Google API key, visit [this page](https://www.chromium.org/developers/how-tos/api-keys).

By default, a newly generated Google API key may not be allowed to make geocoding requests. To enable geocoding requests, visit [this page](https://console.developers.google.com/apis/api/geolocation/overview).

### [`ELECTRON_NO_ASAR`](#electron_no_asar)

Disables ASAR support. This variable is only supported in forked child processes and spawned child processes that set `ELECTRON_RUN_AS_NODE`.

### [`ELECTRON_RUN_AS_NODE`](#electron_run_as_node)

Starts the process as a normal Node.js process.

### [`ELECTRON_NO_ATTACH_CONSOLE` _Windows_](#electron_no_attach_console-windows)

Don't attach to the current console session.

### [`ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_](#electron_force_window_menu_bar-linux)

Don't use the global menu bar on Linux.

### [`ELECTRON_TRASH` _Linux_](#electron_trash-linux)

Set the trash implementation on Linux. Default is `gio`.

Options:

*   `gvfs-trash`
*   `trash-cli`
*   `kioclient5`
*   `kioclient`

[Development Variables](#development-variables)
-----------------------------------------------

The following environment variables are intended primarily for development and debugging purposes.

### [`ELECTRON_ENABLE_LOGGING`](#electron_enable_logging)

Prints Chrome's internal logging to the console.

### [`ELECTRON_LOG_ASAR_READS`](#electron_log_asar_reads)

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### [`ELECTRON_ENABLE_STACK_DUMPING`](#electron_enable_stack_dumping)

Prints the stack trace to the console when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### [`ELECTRON_DEFAULT_ERROR_MODE` _Windows_](#electron_default_error_mode-windows)

Shows the Windows's crash dialog when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### [`ELECTRON_OVERRIDE_DIST_PATH`](#electron_override_dist_path)

When running from the `electron` package, this variable tells the `electron` command to use the specified build of Electron instead of the one downloaded by `npm install`. Usage:

    export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug

* * *

[Electron FAQ](#electron-faq)
=============================

[Why am I having trouble installing Electron?](#why-am-i-having-trouble-installing-electron)
--------------------------------------------------------------------------------------------

When running `npm install electron`, some users occasionally encounter installation errors.

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or wait a bit and try installing again.

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

[When will Electron upgrade to latest Chrome?](#when-will-electron-upgrade-to-latest-chrome)
--------------------------------------------------------------------------------------------

The Chrome version of Electron is usually bumped within one or two weeks after a new stable Chrome version gets released. This estimate is not guaranteed and depends on the amount of work involved with upgrading.

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

For more information, please see the [security introduction](/docs/tutorial/security).

[When will Electron upgrade to latest Node.js?](#when-will-electron-upgrade-to-latest-nodejs)
---------------------------------------------------------------------------------------------

When a new version of Node.js gets released, we usually wait for about a month before upgrading the one in Electron. So we can avoid getting affected by bugs introduced in new Node.js versions, which happens very often.

New features of Node.js are usually brought by V8 upgrades, since Electron is using the V8 shipped by Chrome browser, the shiny new JavaScript feature of a new Node.js version is usually already in Electron.

[How to share data between web pages?](#how-to-share-data-between-web-pages)
----------------------------------------------------------------------------

To share data between web pages (the renderer processes) the simplest way is to use HTML5 APIs which are already available in browsers. Good candidates are [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage), and [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Or you can use the IPC system, which is specific to Electron, to store objects in the main process as a global variable, and then to access them from the renderers through the `remote` property of `electron` module:

    // In the main process.
    global.sharedObject = {
      someProperty: 'default value'
    }

    // In page 1.
    require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'

    // In page 2.
    console.log(require('electron').remote.getGlobal('sharedObject').someProperty)

[My app's window/tray disappeared after a few minutes.](#my-apps-windowtray-disappeared-after-a-few-minutes)
------------------------------------------------------------------------------------------------------------

This happens when the variable which is used to store the window/tray gets garbage collected.

If you encounter this problem, the following articles may prove helpful:

*   [Memory Management](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
*   [Variable Scope](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

If you want a quick fix, you can make the variables global by changing your code from this:

    const { app, Tray } = require('electron')
    app.on('ready', () => {
      const tray = new Tray('/path/to/icon.png')
      tray.setTitle('hello world')
    })

to this:

    const { app, Tray } = require('electron')
    let tray = null
    app.on('ready', () => {
      tray = new Tray('/path/to/icon.png')
      tray.setTitle('hello world')
    })

[I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.](#i-can-not-use-jqueryrequirejsmeteorangularjs-in-electron)
-------------------------------------------------------------------------------------------------------------------------

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

    // In the main process.
    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false
      }
    })
    win.show()

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

    <head>
    <script>
    window.nodeRequire = require;
    delete window.require;
    delete window.exports;
    delete window.module;
    </script>
    <script type="text/javascript" src="jquery.js"></script>
    </head>

[`require('electron').xxx` is undefined.](#requireelectronxxx-is-undefined)
---------------------------------------------------------------------------

When using Electron's built-in module you might encounter an error like this:

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

    console.log(require.resolve('electron'))

and then check if it is in the following form:

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

    npm uninstall electron
    npm uninstall -g electron

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.

* * *

[FileFilter Object](#filefilter-object)
=======================================

*   `name` String
*   `extensions` String\[\]

* * *

[`File` Object](#file-object)
=============================

> Use the HTML5 `File` API to work natively with files on the filesystem.

The DOM's File interface provides abstraction around native files in order to let users work on native files directly with the HTML5 file API. Electron has added a `path` attribute to the `File` interface which exposes the file's real path on filesystem.

Example of getting a real path from a dragged-onto-the-app file:

    <div id="holder">
      Drag your file here
    </div>
    
    <script>
      document.addEventListener('drop', function (e) {
        e.preventDefault();
        e.stopPropagation();
        
        for (let f of e.dataTransfer.files) {
          console.log('File(s) you dragged here: ', f.path)
        }
      });
      document.addEventListener('dragover', function (e) {
        e.preventDefault();
        e.stopPropagation();
      });
    </script>

* * *

[Writing Your First Electron App](#writing-your-first-electron-app)
===================================================================

Electron enables you to create desktop applications with pure JavaScript by providing a runtime with rich native (operating system) APIs. You could see it as a variant of the Node.js runtime that is focused on desktop applications instead of web servers.

This doesn't mean Electron is a JavaScript binding to graphical user interface (GUI) libraries. Instead, Electron uses web pages as its GUI, so you could also see it as a minimal Chromium browser, controlled by JavaScript.

**Note**: This example is also available as a repository you can [download and run immediately](#trying-this-example).

As far as development is concerned, an Electron application is essentially a Node.js application. The starting point is a `package.json` that is identical to that of a Node.js module. A most basic Electron app would have the following folder structure:

    your-app/
    ├── package.json
    ├── main.js
    └── index.html

Create a new empty folder for your new Electron application. Open up your command line client and run `npm init` from that very folder.

    npm init

npm will guide you through creating a basic `package.json` file. The script specified by the `main` field is the startup script of your app, which will run the main process. An example of your `package.json` might look like this:

    {
      "name": "your-app",
      "version": "0.1.0",
      "main": "main.js"
    }

**Note**: If the `main` field is not present in `package.json`, Electron will attempt to load an `index.js` (as Node.js does). If this was actually a simple Node application, you would add a `start` script that instructs `node` to execute the current package:

    {
      "name": "your-app",
      "version": "0.1.0",
      "main": "main.js",
      "scripts": {
        "start": "node ."
      }
    }

Turning this Node application into an Electron application is quite simple - we merely replace the `node` runtime with the `electron` runtime.

    {
      "name": "your-app",
      "version": "0.1.0",
      "main": "main.js",
      "scripts": {
        "start": "electron ."
      }
    }

[Installing Electron](#installing-electron)
-------------------------------------------

At this point, you'll need to install `electron` itself. The recommended way of doing so is to install it as a development dependency in your app, which allows you to work on multiple apps with different Electron versions. To do so, run the following command from your app's directory:

    npm install --save-dev electron

Other means for installing Electron exist. Please consult the [installation guide](/docs/tutorial/installation) to learn about use with proxies, mirrors, and custom caches.

[Electron Development in a Nutshell](#electron-development-in-a-nutshell)
-------------------------------------------------------------------------

Electron apps are developed in JavaScript using the same principles and methods found in Node.js development. All APIs and features found in Electron are accessible through the `electron` module, which can be required like any other Node.js module:

    const electron = require('electron')

The `electron` module exposes features in namespaces. As examples, the lifecycle of the application is managed through `electron.app`, windows can be created using the `electron.BrowserWindow` class. A simple `main.js` file might wait for the application to be ready and open a window:

    const { app, BrowserWindow } = require('electron')
    
    function createWindow () {
      // Create the browser window.
      let win = new BrowserWindow({ width: 800, height: 600 })
    
      // and load the index.html of the app.
      win.loadFile('index.html')
    }
    
    app.on('ready', createWindow)

The `main.js` should create windows and handle all the system events your application might encounter. A more complete version of the above example might open developer tools, handle the window being closed, or re-create windows on macOS if the user clicks on the app's icon in the dock.

    const { app, BrowserWindow } = require('electron')
    
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the JavaScript object is garbage collected.
    let win
    
    function createWindow () {
      // Create the browser window.
      win = new BrowserWindow({ width: 800, height: 600 })
    
      // and load the index.html of the app.
      win.loadFile('index.html')
    
      // Open the DevTools.
      win.webContents.openDevTools()
    
      // Emitted when the window is closed.
      win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null
      })
    }
    
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on('ready', createWindow)
    
    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
      // On macOS it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== 'darwin') {
        app.quit()
      }
    })
    
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (win === null) {
        createWindow()
      }
    })
    
    // In this file you can include the rest of your app's specific main process
    // code. You can also put them in separate files and require them here.

Finally the `index.html` is the web page you want to show:

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>Hello World!</title>
      </head>
      <body>
        <h1>Hello World!</h1>
        We are using node <script>document.write(process.versions.node)</script>,
        Chrome <script>document.write(process.versions.chrome)</script>,
        and Electron <script>document.write(process.versions.electron)</script>.
      </body>
    </html>

[Running Your App](#running-your-app)
-------------------------------------

Once you've created your initial `main.js`, `index.html`, and `package.json` files, you can try your app by running `npm start` from your application's directory.

[Trying this Example](#trying-this-example)
-------------------------------------------

Clone and run the code in this tutorial by using the [`electron/electron-quick-start`](https://github.com/electron/electron-quick-start) repository.

**Note**: Running this requires [Git](https://git-scm.com) and [npm](https://www.npmjs.com/).

    # Clone the repository
    $ git clone https://github.com/electron/electron-quick-start
    # Go into the repository
    $ cd electron-quick-start
    # Install dependencies
    $ npm install
    # Run the app
    $ npm start

For a list of boilerplates and tools to kick-start your development process, see the [Boilerplates and CLIs documentation](/docs/tutorial/boilerplates-and-clis).

* * *

[Frameless Window](#frameless-window)
=====================================

> Open a window without toolbars, borders, or other graphical "chrome".

A frameless window is a window that has no [chrome](https://developer.mozilla.org/en-US/docs/Glossary/Chrome), the parts of the window, like toolbars, that are not a part of the web page. These are options on the [`BrowserWindow`](/docs/api/browser-window) class.

[Create a frameless window](#create-a-frameless-window)
-------------------------------------------------------

To create a frameless window, you need to set `frame` to `false` in [BrowserWindow](/docs/api/browser-window)'s `options`:

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow({ width: 800, height: 600, frame: false })
    win.show()

### [Alternatives on macOS](#alternatives-on-macos)

There's an alternative way to specify a chromeless window. Instead of setting `frame` to `false` which disables both the titlebar and window controls, you may want to have the title bar hidden and your content extend to the full window size, yet still preserve the window controls ("traffic lights") for standard window actions. You can do so by specifying the `titleBarStyle` option:

#### [`hidden`](#hidden)

Results in a hidden title bar and a full size content window, yet the title bar still has the standard window controls (“traffic lights”) in the top left.

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow({ titleBarStyle: 'hidden' })
    win.show()

#### [`hiddenInset`](#hiddeninset)

Results in a hidden title bar with an alternative look where the traffic light buttons are slightly more inset from the window edge.

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow({ titleBarStyle: 'hiddenInset' })
    win.show()

#### [`customButtonsOnHover`](#custombuttonsonhover)

Uses custom drawn close, and miniaturize buttons that display when hovering in the top left of the window. The fullscreen button is not available due to restrictions of frameless windows as they interface with Apple's MacOS window masks. These custom buttons prevent issues with mouse events that occur with the standard window toolbar buttons. This option is only applicable for frameless windows.

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false })
    win.show()

[Transparent window](#transparent-window)
-----------------------------------------

By setting the `transparent` option to `true`, you can also make the frameless window transparent:

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow({ transparent: true, frame: false })
    win.show()

### [Limitations](#limitations)

*   You can not click through the transparent area. We are going to introduce an API to set window shape to solve this, see [our issue](https://github.com/electron/electron/issues/1335) for details.
*   Transparent windows are not resizable. Setting `resizable` to `true` may make a transparent window stop working on some platforms.
*   The `blur` filter only applies to the web page, so there is no way to apply blur effect to the content below the window (i.e. other applications open on the user's system).
*   On Windows operating systems, transparent windows will not work when DWM is disabled.
*   On Linux, users have to put `--enable-transparent-visuals --disable-gpu` in the command line to disable GPU and allow ARGB to make transparent window, this is caused by an upstream bug that [alpha channel doesn't work on some NVidia drivers](https://code.google.com/p/chromium/issues/detail?id=369209) on Linux.
*   On Mac, the native window shadow will not be shown on a transparent window.

[Click-through window](#click-through-window)
---------------------------------------------

To create a click-through window, i.e. making the window ignore all mouse events, you can call the [win.setIgnoreMouseEvents(ignore)](/docs/api/browser-window#winsetignoremouseeventsignore-options) API:

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow()
    win.setIgnoreMouseEvents(true)

### [Forwarding](#forwarding)

Ignoring mouse messages makes the web page oblivious to mouse movement, meaning that mouse movement events will not be emitted. On Windows operating systems an optional parameter can be used to forward mouse move messages to the web page, allowing events such as `mouseleave` to be emitted:

    let win = require('electron').remote.getCurrentWindow()
    let el = document.getElementById('clickThroughElement')
    el.addEventListener('mouseenter', () => {
      win.setIgnoreMouseEvents(true, { forward: true })
    })
    el.addEventListener('mouseleave', () => {
      win.setIgnoreMouseEvents(false)
    })

This makes the web page click-through when over `el`, and returns to normal outside it.

[Draggable region](#draggable-region)
-------------------------------------

By default, the frameless window is non-draggable. Apps need to specify `-webkit-app-region: drag` in CSS to tell Electron which regions are draggable (like the OS's standard titlebar), and apps can also use `-webkit-app-region: no-drag` to exclude the non-draggable area from the draggable region. Note that only rectangular shapes are currently supported.

Note: `-webkit-app-region: drag` is known to have problems while the developer tools are open. See this [GitHub issue](https://github.com/electron/electron/issues/3647) for more information including a workaround.

To make the whole window draggable, you can add `-webkit-app-region: drag` as `body`'s style:

    <body style="-webkit-app-region: drag">
    </body>

And note that if you have made the whole window draggable, you must also mark buttons as non-draggable, otherwise it would be impossible for users to click on them:

    button {
      -webkit-app-region: no-drag;
    }

If you're only setting a custom titlebar as draggable, you also need to make all buttons in titlebar non-draggable.

[Text selection](#text-selection)
---------------------------------

In a frameless window the dragging behaviour may conflict with selecting text. For example, when you drag the titlebar you may accidentally select the text on the titlebar. To prevent this, you need to disable text selection within a draggable area like this:

    .titlebar {
      -webkit-user-select: none;
      -webkit-app-region: drag;
    }

[Context menu](#context-menu)
-----------------------------

On some platforms, the draggable area will be treated as a non-client frame, so when you right click on it a system menu will pop up. To make the context menu behave correctly on all platforms you should never use a custom context menu on draggable areas.

* * *

[globalShortcut](#globalshortcut)
=================================

> Detect keyboard events when the application does not have keyboard focus.

Process: [Main](/docs/glossary#main-process)

The `globalShortcut` module can register/unregister a global keyboard shortcut with the operating system so that you can customize the operations for various shortcuts.

**Note:** The shortcut is global; it will work even if the app does not have the keyboard focus. You should not use this module until the `ready` event of the app module is emitted.

    const { app, globalShortcut } = require('electron')
    
    app.on('ready', () => {
      // Register a 'CommandOrControl+X' shortcut listener.
      const ret = globalShortcut.register('CommandOrControl+X', () => {
        console.log('CommandOrControl+X is pressed')
      })
    
      if (!ret) {
        console.log('registration failed')
      }
    
      // Check whether a shortcut is registered.
      console.log(globalShortcut.isRegistered('CommandOrControl+X'))
    })
    
    app.on('will-quit', () => {
      // Unregister a shortcut.
      globalShortcut.unregister('CommandOrControl+X')
    
      // Unregister all shortcuts.
      globalShortcut.unregisterAll()
    })

[Methods](#methods)
-------------------

The `globalShortcut` module has the following methods:

### [`globalShortcut.register(accelerator, callback)`](#globalshortcutregisteraccelerator-callback)

*   `accelerator` [Accelerator](/docs/api/accelerator)
*   `callback` Function

Registers a global shortcut of `accelerator`. The `callback` is called when the registered shortcut is pressed by the user.

When the accelerator is already taken by other applications, this call will silently fail. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

The following accelerators will not be registered successfully on macOS 10.14 Mojave unless the app has been authorized as a [trusted accessibility client](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html):

*   "Media Play/Pause"
*   "Media Next Track"
*   "Media Previous Track"
*   "Media Stop"

### [`globalShortcut.isRegistered(accelerator)`](#globalshortcutisregisteredaccelerator)

*   `accelerator` [Accelerator](/docs/api/accelerator)

Returns `Boolean` - Whether this application has registered `accelerator`.

When the accelerator is already taken by other applications, this call will still return `false`. This behavior is intended by operating systems, since they don't want applications to fight for global shortcuts.

### [`globalShortcut.unregister(accelerator)`](#globalshortcutunregisteraccelerator)

*   `accelerator` [Accelerator](/docs/api/accelerator)

Unregisters the global shortcut of `accelerator`.

### [`globalShortcut.unregisterAll()`](#globalshortcutunregisterall)

Unregisters all of the global shortcuts.

* * *

[Glossary](#glossary)
=====================

This page defines some terminology that is commonly used in Electron development.

### [ASAR](#asar)

ASAR stands for Atom Shell Archive Format. An [asar](https://github.com/electron/asar) archive is a simple `tar`\-like format that concatenates files into a single file. Electron can read arbitrary files from it without unpacking the whole file.

The ASAR format was created primarily to improve performance on Windows... TODO

### [CRT](#crt)

The C Run-time Library (CRT) is the part of the C++ Standard Library that incorporates the ISO C99 standard library. The Visual C++ libraries that implement the CRT support native code development, and both mixed native and managed code, and pure managed code for .NET development.

### [DMG](#dmg)

An Apple Disk Image is a packaging format used by macOS. DMG files are commonly used for distributing application "installers". [electron-builder](https://github.com/electron-userland/electron-builder) supports `dmg` as a build target.

### [IME](#ime)

Input Method Editor. A program that allows users to enter characters and symbols not found on their keyboard. For example, this allows users of Latin keyboards to input Chinese, Japanese, Korean and Indic characters.

### [IDL](#idl)

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### [IPC](#ipc)

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### [libchromiumcontent](#libchromiumcontent)

A shared library that includes the [Chromium Content module](https://www.chromium.org/developers/content-module) and all its dependencies (e.g., Blink, [V8](#v8), etc.). Also referred to as "libcc".

*   [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### [main process](#main-process)

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. It also manages native elements such as the Menu, Menu Bar, Dock, Tray, etc. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

See also: [process](#process), [renderer process](#renderer-process)

### [MAS](#mas)

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](/docs/tutorial/mac-app-store-submission-guide).

### [Mojo](#mojo)

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See [https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md](https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md)

### [native modules](#native-modules)

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](/docs/tutorial/using-native-node-modules).

### [NSIS](#nsis)

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### [OSR](#osr)

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### [process](#process)

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### [renderer process](#renderer-process)

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

In normal browsers, web pages usually run in a sandboxed environment and are not allowed access to native resources. Electron users, however, have the power to use Node.js APIs in web pages allowing lower level operating system interactions.

See also: [process](#process), [main process](#main-process)

### [Squirrel](#squirrel)

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](/docs/api/auto-updater) API for info about getting started with Squirrel.

### [userland](#userland)

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### [V8](#v8)

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

*   [developers.google.com/v8](https://developers.google.com/v8)
*   [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
*   [docs/development/v8-development.md](/docs/development/v8-development)

### [webview](#webview)

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.

* * *

[GPUFeatureStatus Object](#gpufeaturestatus-object)
===================================================

*   `2d_canvas` String - Canvas.
*   `flash_3d` String - Flash.
*   `flash_stage3d` String - Flash Stage3D.
*   `flash_stage3d_baseline` String - Flash Stage3D Baseline profile.
*   `gpu_compositing` String - Compositing.
*   `multiple_raster_threads` String - Multiple Raster Threads.
*   `native_gpu_memory_buffers` String - Native GpuMemoryBuffers.
*   `rasterization` String - Rasterization.
*   `video_decode` String - Video Decode.
*   `video_encode` String - Video Encode.
*   `vpx_decode` String - VPx Video Decode.
*   `webgl` String - WebGL.
*   `webgl2` String - WebGL2.

Possible values:

*   `disabled_software` - Software only. Hardware acceleration disabled (yellow)
*   `disabled_off` - Disabled (red)
*   `disabled_off_ok` - Disabled (yellow)
*   `unavailable_software` - Software only, hardware acceleration unavailable (yellow)
*   `unavailable_off` - Unavailable (red)
*   `unavailable_off_ok` - Unavailable (yellow)
*   `enabled_readback` - Hardware accelerated but at reduced performance (yellow)
*   `enabled_force` - Hardware accelerated on all pages (green)
*   `enabled` - Hardware accelerated (green)
*   `enabled_on` - Enabled (green)
*   `enabled_force_on` - Force enabled (green)

* * *

[inAppPurchase](#inapppurchase)
===============================

> In-app purchases on Mac App Store.

Process: [Main](/docs/glossary#main-process)

[Events](#events)
-----------------

The `inAppPurchase` module emits the following events:

### [Event: 'transactions-updated'](#event-transactions-updated)

Emitted when one or more transactions have been updated.

Returns:

*   `event` Event
*   `transactions` Transaction\[\] - Array of [`Transaction`](/docs/api/structures/transaction) objects.

[Methods](#methods)
-------------------

The `inAppPurchase` module has the following methods:

### [`inAppPurchase.purchaseProduct(productID, quantity, callback)`](#inapppurchasepurchaseproductproductid-quantity-callback)

*   `productID` String - The identifiers of the product to purchase. (The identifier of `com.example.app.product1` is `product1`).
*   `quantity` Integer (optional) - The number of items the user wants to purchase.
*   `callback` Function (optional) - The callback called when the payment is added to the PaymentQueue.
    
    *   `isProductValid` Boolean - Determine if the product is valid and added to the payment queue.

You should listen for the `transactions-updated` event as soon as possible and certainly before you call `purchaseProduct`.

### [`inAppPurchase.getProducts(productIDs, callback)`](#inapppurchasegetproductsproductids-callback)

*   `productIDs` String\[\] - The identifiers of the products to get.
*   `callback` Function - The callback called with the products or an empty array if the products don't exist.
    
    *   `products` Product\[\] - Array of [`Product`](/docs/api/structures/product) objects

Retrieves the product descriptions.

### [`inAppPurchase.canMakePayments()`](#inapppurchasecanmakepayments)

Returns `Boolean`, whether a user can make a payment.

### [`inAppPurchase.getReceiptURL()`](#inapppurchasegetreceipturl)

Returns `String`, the path to the receipt.

### [`inAppPurchase.finishAllTransactions()`](#inapppurchasefinishalltransactions)

Completes all pending transactions.

### [`inAppPurchase.finishTransactionByDate(date)`](#inapppurchasefinishtransactionbydatedate)

*   `date` String - The ISO formatted date of the transaction to finish.

Completes the pending transactions corresponding to the date.

* * *

[In-App Purchase (macOS)](#in-app-purchase-macos)
=================================================

[Preparing](#preparing)
-----------------------

### [Paid Applications Agreement](#paid-applications-agreement)

If you haven't already, you’ll need to sign the Paid Applications Agreement and set up your banking and tax information in iTunes Connect.

[iTunes Connect Developer Help: Agreements, tax, and banking overview](https://help.apple.com/itunes-connect/developer/#/devb6df5ee51)

### [Create Your In-App Purchases](#create-your-in-app-purchases)

Then, you'll need to configure your in-app purchases in iTunes Connect, and include details such as name, pricing, and description that highlights the features and functionality of your in-app purchase.

[iTunes Connect Developer Help: Create an in-app purchase](https://help.apple.com/itunes-connect/developer/#/devae49fb316)

### [Change the CFBundleIdentifier](#change-the-cfbundleidentifier)

To test In-App Purchase in development with Electron you'll have to change the `CFBundleIdentifier` in `node_modules/electron/dist/Electron.app/Contents/Info.plist`. You have to replace `com.github.electron` by the bundle identifier of the application you created with iTunes Connect.

    <key>CFBundleIdentifier</key>
    <string>com.example.app</string>

[Code example](#code-example)
-----------------------------

Here is an example that shows how to use In-App Purchases in Electron. You'll have to replace the product ids by the identifiers of the products created with iTunes Connect (the identifier of `com.example.app.product1` is `product1`). Note that you have to listen to the `transactions-updated` event as soon as possible in your app.

    const { inAppPurchase } = require('electron').remote
    const PRODUCT_IDS = ['id1', 'id2']
    
    // Listen for transactions as soon as possible.
    inAppPurchase.on('transactions-updated', (event, transactions) => {
      if (!Array.isArray(transactions)) {
        return
      }
    
      // Check each transaction.
      transactions.forEach(function (transaction) {
        var payment = transaction.payment
    
        switch (transaction.transactionState) {
          case 'purchasing':
            console.log(`Purchasing ${payment.productIdentifier}...`)
            break
          case 'purchased':
    
            console.log(`${payment.productIdentifier} purchased.`)
    
            // Get the receipt url.
            let receiptURL = inAppPurchase.getReceiptURL()
    
            console.log(`Receipt URL: ${receiptURL}`)
    
            // Submit the receipt file to the server and check if it is valid.
            // @see https://developer.apple.com/library/content/releasenotes/General/ValidateAppStoreReceipt/Chapters/ValidateRemotely.html
            // ...
            // If the receipt is valid, the product is purchased
            // ...
    
            // Finish the transaction.
            inAppPurchase.finishTransactionByDate(transaction.transactionDate)
    
            break
          case 'failed':
    
            console.log(`Failed to purchase ${payment.productIdentifier}.`)
    
            // Finish the transaction.
            inAppPurchase.finishTransactionByDate(transaction.transactionDate)
    
            break
          case 'restored':
    
            console.log(`The purchase of ${payment.productIdentifier} has been restored.`)
    
            break
          case 'deferred':
    
            console.log(`The purchase of ${payment.productIdentifier} has been deferred.`)
    
            break
          default:
            break
        }
      })
    })
    
    // Check if the user is allowed to make in-app purchase.
    if (!inAppPurchase.canMakePayments()) {
      console.log('The user is not allowed to make in-app purchase.')
    }
    
    // Retrieve and display the product descriptions.
    inAppPurchase.getProducts(PRODUCT_IDS).then(products => {
      // Check the parameters.
      if (!Array.isArray(products) || products.length <= 0) {
        console.log('Unable to retrieve the product informations.')
        return
      }
    
      // Display the name and price of each product.
      products.forEach(product => {
        console.log(`The price of ${product.localizedTitle} is ${product.formattedPrice}.`)
      })
    
      // Ask the user which product he/she wants to purchase.
      let selectedProduct = products[0]
      let selectedQuantity = 1
    
      // Purchase the selected product.
      inAppPurchase.purchaseProduct(selectedProduct.productIdentifier, selectedQuantity).then(isProductValid => {
        if (!isProductValid) {
          console.log('The product is not valid.')
          return
        }
    
        console.log('The payment has been added to the payment queue.')
      })
    })

* * *

[Class: IncomingMessage](#class-incomingmessage)
------------------------------------------------

> Handle responses to HTTP/HTTPS requests.

Process: [Main](/docs/glossary#main-process)

`IncomingMessage` implements the [Readable Stream](https://nodejs.org/api/stream.html#stream_readable_streams) interface and is therefore an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

### [Instance Events](#instance-events)

#### [Event: 'data'](#event-data)

Returns:

*   `chunk` Buffer - A chunk of response body's data.

The `data` event is the usual method of transferring response data into applicative code.

#### [Event: 'end'](#event-end)

Indicates that response body has ended.

#### [Event: 'aborted'](#event-aborted)

Emitted when a request has been canceled during an ongoing HTTP transaction.

#### [Event: 'error'](#event-error)

Returns:

`error` Error - Typically holds an error string identifying failure root cause.

Emitted when an error was encountered while streaming response data events. For instance, if the server closes the underlying while the response is still streaming, an `error` event will be emitted on the response object and a `close` event will subsequently follow on the request object.

### [Instance Properties](#instance-properties)

An `IncomingMessage` instance has the following readable properties:

#### [`response.statusCode`](#responsestatuscode)

An `Integer` indicating the HTTP response status code.

#### [`response.statusMessage`](#responsestatusmessage)

A `String` representing the HTTP status message.

#### [`response.headers`](#responseheaders)

An `Object` representing the response HTTP headers. The `headers` object is formatted as follows:

*   All header names are lowercased.
*   Each header name produces an array-valued property on the headers object.
*   Each header value is pushed into the array associated with its header name.

#### [`response.httpVersion`](#responsehttpversion)

A `String` indicating the HTTP protocol version number. Typical values are '1.0' or '1.1'. Additionally `httpVersionMajor` and `httpVersionMinor` are two Integer-valued readable properties that return respectively the HTTP major and minor version numbers.

#### [`response.httpVersionMajor`](#responsehttpversionmajor)

An `Integer` indicating the HTTP protocol major version number.

#### [`response.httpVersionMinor`](#responsehttpversionminor)

An `Integer` indicating the HTTP protocol minor version number.

* * *

[Installation](#installation)
=============================

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com). The preferred method is to install Electron as a development dependency in your app:

    npm install electron --save-dev

See the [Electron versioning doc](/docs/tutorial/electron-versioning) for info on how to manage Electron versions in your apps.

[Global Installation](#global-installation)
-------------------------------------------

You can also install the `electron` command globally in your `$PATH`:

    npm install electron -g

[Customization](#customization)
-------------------------------

If you want to change the architecture that is downloaded (e.g., `ia32` on an `x64` machine), you can use the `--arch` flag with npm install or set the `npm_config_arch` environment variable:

    npm install --arch=ia32 electron

In addition to changing the architecture, you can also specify the platform (e.g., `win32`, `linux`, etc.) using the `--platform` flag:

    npm install --platform=win32 electron

[Proxies](#proxies)
-------------------

If you need to use an HTTP proxy you can [set these environment variables](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

[Custom Mirrors and Caches](#custom-mirrors-and-caches)
-------------------------------------------------------

During installation, the `electron` module will call out to [`electron-download`](https://github.com/electron-userland/electron-download) to download prebuilt binaries of Electron for your platform. It will do so by contacting GitHub's release download page (`https://github.com/electron/electron/releases/tag/v$VERSION`, where `$VERSION` is the exact version of Electron).

If you are unable to access GitHub or you need to provide a custom build, you can do so by either providing a mirror or an existing cache directory.

#### [Mirror](#mirror)

You can use environment variables to override the base URL, the path at which to look for Electron binaries, and the binary filename. The url used by `electron-download` is composed as follows:

    url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME

For instance, to use the China mirror:

    ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"

#### [Cache](#cache)

Alternatively, you can override the local cache. `electron-download` will cache downloaded binaries in a local directory to not stress your network. You can use that cache folder to provide custom builds of Electron or to avoid making contact with the network at all.

*   Linux: `$XDG_CACHE_HOME` or `~/.cache/electron/`
*   MacOS: `~/Library/Caches/electron/`
*   Windows: `$LOCALAPPDATA/electron/Cache` or `~/AppData/Local/electron/Cache/`

On environments that have been using older versions of Electron, you might find the cache also in `~/.electron`.

You can also override the local cache location by providing a `ELECTRON_CACHE` environment variable.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

    ├── electron-v1.7.9-darwin-x64.zip
    ├── electron-v1.8.1-darwin-x64.zip
    ├── electron-v1.8.2-beta.1-darwin-x64.zip
    ├── electron-v1.8.2-beta.2-darwin-x64.zip
    ├── electron-v1.8.2-beta.3-darwin-x64.zip
    ├── SHASUMS256.txt-1.7.9
    ├── SHASUMS256.txt-1.8.1
    ├── SHASUMS256.txt-1.8.2-beta.1
    ├── SHASUMS256.txt-1.8.2-beta.2
    ├── SHASUMS256.txt-1.8.2-beta.3

[Troubleshooting](#troubleshooting)
-----------------------------------

When running `npm install electron`, some users occasionally encounter installation errors.

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or wait a bit and try installing again.

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

    sudo npm install electron --unsafe-perm=true

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

    npm install --verbose electron

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.

* * *

[IOCounters Object](#iocounters-object)
=======================================

*   `readOperationCount` Number - The number of I/O read operations.
*   `writeOperationCount` Number - The number of I/O write operations.
*   `otherOperationCount` Number - Then number of I/O other operations.
*   `readTransferCount` Number - The number of I/O read transfers.
*   `writeTransferCount` Number - The number of I/O write transfers.
*   `otherTransferCount` Number - Then number of I/O other transfers.

* * *

[ipcMain](#ipcmain)
===================

> Communicate asynchronously from the main process to renderer processes.

Process: [Main](/docs/glossary#main-process)

The `ipcMain` module is an instance of the [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class. When used in the main process, it handles asynchronous and synchronous messages sent from a renderer process (web page). Messages sent from a renderer will be emitted to this module.

[Sending Messages](#sending-messages)
-------------------------------------

It is also possible to send messages from the main process to the renderer process, see [webContents.send](/docs/api/web-contents#contentssendchannel-arg1-arg2-) for more information.

*   When sending a message, the event name is the `channel`.
*   To reply to a synchronous message, you need to set `event.returnValue`.
*   To send an asynchronous message back to the sender, you can use `event.sender.send(...)`.

An example of sending and handling messages between the render and main processes:

    // In main process.
    const { ipcMain } = require('electron')
    ipcMain.on('asynchronous-message', (event, arg) => {
      console.log(arg) // prints "ping"
      event.sender.send('asynchronous-reply', 'pong')
    })
    
    ipcMain.on('synchronous-message', (event, arg) => {
      console.log(arg) // prints "ping"
      event.returnValue = 'pong'
    })

    // In renderer process (web page).
    const { ipcRenderer } = require('electron')
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping')) // prints "pong"
    
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
      console.log(arg) // prints "pong"
    })
    ipcRenderer.send('asynchronous-message', 'ping')

[Methods](#methods)
-------------------

The `ipcMain` module has the following method to listen for events:

### [`ipcMain.on(channel, listener)`](#ipcmainonchannel-listener)

*   `channel` String
*   `listener` Function

Listens to `channel`, when a new message arrives `listener` would be called with `listener(event, args...)`.

### [`ipcMain.once(channel, listener)`](#ipcmainoncechannel-listener)

*   `channel` String
*   `listener` Function

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### [`ipcMain.removeListener(channel, listener)`](#ipcmainremovelistenerchannel-listener)

*   `channel` String
*   `listener` Function

Removes the specified `listener` from the listener array for the specified `channel`.

### [`ipcMain.removeAllListeners([channel])`](#ipcmainremovealllistenerschannel)

*   `channel` String

Removes listeners of the specified `channel`.

[Event object](#event-object)
-----------------------------

The `event` object passed to the `callback` has the following methods:

### [`event.returnValue`](#eventreturnvalue)

Set this to the value to be returned in a synchronous message.

### [`event.sender`](#eventsender)

Returns the `webContents` that sent the message, you can call `event.sender.send` to reply to the asynchronous message, see [webContents.send](/docs/api/web-contents#contentssendchannel-arg1-arg2-) for more information.

* * *

[ipcRenderer](#ipcrenderer)
===========================

> Communicate asynchronously from a renderer process to the main process.

Process: [Renderer](/docs/glossary#renderer-process)

The `ipcRenderer` module is an instance of the [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter) class. It provides a few methods so you can send synchronous and asynchronous messages from the render process (web page) to the main process. You can also receive replies from the main process.

See [ipcMain](/docs/api/ipc-main) for code examples.

[Methods](#methods)
-------------------

The `ipcRenderer` module has the following method to listen for events and send messages:

### [`ipcRenderer.on(channel, listener)`](#ipcrendereronchannel-listener)

*   `channel` String
*   `listener` Function

Listens to `channel`, when a new message arrives `listener` would be called with `listener(event, args...)`.

### [`ipcRenderer.once(channel, listener)`](#ipcrendereroncechannel-listener)

*   `channel` String
*   `listener` Function

Adds a one time `listener` function for the event. This `listener` is invoked only the next time a message is sent to `channel`, after which it is removed.

### [`ipcRenderer.removeListener(channel, listener)`](#ipcrendererremovelistenerchannel-listener)

*   `channel` String
*   `listener` Function

Removes the specified `listener` from the listener array for the specified `channel`.

### [`ipcRenderer.removeAllListeners(channel)`](#ipcrendererremovealllistenerschannel)

*   `channel` String

Removes all listeners, or those of the specified `channel`.

### [`ipcRenderer.send(channel[, arg1][, arg2][, ...])`](#ipcrenderersendchannel-arg1-arg2-)

*   `channel` String
*   `...args` any\[\]

Send a message to the main process asynchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with [`ipcMain`](/docs/api/ipc-main) module.

### [`ipcRenderer.sendSync(channel[, arg1][, arg2][, ...])`](#ipcrenderersendsyncchannel-arg1-arg2-)

*   `channel` String
*   `...args` any\[\]

Returns `any` - The value sent back by the [`ipcMain`](/docs/api/ipc-main) handler.

Send a message to the main process synchronously via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The main process handles it by listening for `channel` with [`ipcMain`](/docs/api/ipc-main) module, and replies by setting `event.returnValue`.

**Note:** Sending a synchronous message will block the whole renderer process, unless you know what you are doing you should never use it.

### [`ipcRenderer.sendTo(webContentsId, channel, [, arg1][, arg2][, ...])`](#ipcrenderersendtowebcontentsid-channel--arg1-arg2-)

*   `webContentsId` Number
*   `channel` String
*   `...args` any\[\]

Sends a message to a window with `webContentsId` via `channel`.

### [`ipcRenderer.sendToHost(channel[, arg1][, arg2][, ...])`](#ipcrenderersendtohostchannel-arg1-arg2-)

*   `channel` String
*   `...args` any\[\]

Like `ipcRenderer.send` but the event will be sent to the `<webview>` element in the host page instead of the main process.

[Event object](#event-object)
-----------------------------

The `event` object passed to the `callback` has the following methods:

### [`event.senderId`](#eventsenderid)

Returns the `webContents.id` that sent the message, you can call `event.sender.sendTo(event.senderId, ...)` to reply to the message, see [ipcRenderer.sendTo](#ipcrenderersendtowindowid-channel--arg1-arg2-) for more information. This only applies to messages sent from a different renderer. Messages sent directly from the main process set `event.senderId` to `0`.

* * *

[Issues In Electron](#issues-in-electron)
=========================================

[Issues](#issues)
=================

*   [How to Contribute in Issues](#how-to-contribute-in-issues)
*   [Asking for General Help](#asking-for-general-help)
*   [Submitting a Bug Report](#submitting-a-bug-report)
*   [Triaging a Bug Report](#triaging-a-bug-report)
*   [Resolving a Bug Report](#resolving-a-bug-report)

[How to Contribute in Issues](#how-to-contribute-in-issues)
-----------------------------------------------------------

For any issue, there are fundamentally three ways an individual can contribute:

1.  By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the `electron/electron` issue tracker.
2.  By helping to triage the issue: You can do this either by providing assistive details (a reproducible test case that demonstrates a bug) or by providing suggestions to address the issue.
3.  By helping to resolve the issue: This can be done by demonstrating that the issue is not a bug or is fixed; but more often, by opening a pull request that changes the source in `electron/electron` in a concrete and reviewable manner.

[Asking for General Help](#asking-for-general-help)
---------------------------------------------------

["Finding Support"](/docs/tutorial/support#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. Please use the issue tracker for bugs only!

[Submitting a Bug Report](#submitting-a-bug-report)
---------------------------------------------------

When opening a new issue in the `electron/electron` issue tracker, users will be presented with a template that should be filled in.

    <!--
    Thanks for opening an issue! A few things to keep in mind:
    
    - The issue tracker is only for bugs and feature requests.
    - Before reporting a bug, please try reproducing your issue against
      the latest version of Electron.
    - If you need general advice, join our Slack: http://atom-slack.herokuapp.com
    -->
    
    * Electron version:
    * Operating system:
    
    ### Expected behavior
    
    <!-- What do you think should happen? -->
    
    ### Actual behavior
    
    <!-- What actually happens? -->
    
    ### How to reproduce
    
    <!--
    
    Your best chance of getting this bug looked at quickly is to provide a REPOSITORY that can be cloned and run.
    
    You can fork https://github.com/electron/electron-quick-start and include a link to the branch with your changes.
    
    If you provide a URL, please list the commands required to clone/setup/run your repo e.g.
    
      $ git clone $YOUR_URL -b $BRANCH
      $ npm install
      $ npm start || electron .
    
    -->

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

[Triaging a Bug Report](#triaging-a-bug-report)
-----------------------------------------------

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If encounter an issue that you feel is invalid, or which contains incorrect information, explain _why_ you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

[Resolving a Bug Report](#resolving-a-bug-report)
-------------------------------------------------

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.

* * *

[JumpListCategory Object](#jumplistcategory-object)
===================================================

*   `type` String (optional) - One of the following:
    
    *   `tasks` - Items in this category will be placed into the standard `Tasks` category. There can be only one such category, and it will always be displayed at the bottom of the Jump List.
    *   `frequent` - Displays a list of files frequently opened by the app, the name of the category and its items are set by Windows.
    *   `recent` - Displays a list of files recently opened by the app, the name of the category and its items are set by Windows. Items may be added to this category indirectly using `app.addRecentDocument(path)`.
    *   `custom` - Displays tasks or file links, `name` must be set by the app.
*   `name` String (optional) - Must be set if `type` is `custom`, otherwise it should be omitted.
*   `items` JumpListItem[](/docs/api/structures/optional) - Array of [`JumpListItem`](/docs/api/structures/jump-list-item) objects if `type` is `tasks` or `custom`, otherwise it should be omitted.

**Note:** If a `JumpListCategory` object has neither the `type` nor the `name` property set then its `type` is assumed to be `tasks`. If the `name` property is set but the `type` property is omitted then the `type` is assumed to be `custom`.

* * *

[JumpListItem Object](#jumplistitem-object)
===========================================

*   `type` String (optional) - One of the following:
    
    *   `task` - A task will launch an app with specific arguments.
    *   `separator` - Can be used to separate items in the standard `Tasks` category.
    *   `file` - A file link will open a file using the app that created the Jump List, for this to work the app must be registered as a handler for the file type (though it doesn't have to be the default handler).
*   `path` String (optional) - Path of the file to open, should only be set if `type` is `file`.
*   `program` String (optional) - Path of the program to execute, usually you should specify `process.execPath` which opens the current program. Should only be set if `type` is `task`.
*   `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
*   `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
*   `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
*   `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
*   `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.

* * *

[Keyboard Shortcuts](#keyboard-shortcuts)
=========================================

> Configure local and global keyboard shortcuts

[Local Shortcuts](#local-shortcuts)
-----------------------------------

You can use the [Menu](/docs/api/menu) module to configure keyboard shortcuts that will be triggered only when the app is focused. To do so, specify an [`accelerator`](/docs/api/accelerator) property when creating a [MenuItem](/docs/api/menu-item).

    const { Menu, MenuItem } = require('electron')
    const menu = new Menu()
    
    menu.append(new MenuItem({
      label: 'Print',
      accelerator: 'CmdOrCtrl+P',
      click: () => { console.log('time to print stuff') }
    }))

You can configure different key combinations based on the user's operating system.

    {
      accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Ctrl+Shift+I'
    }

[Global Shortcuts](#global-shortcuts)
-------------------------------------

You can use the [globalShortcut](/docs/api/global-shortcut) module to detect keyboard events even when the application does not have keyboard focus.

    const { app, globalShortcut } = require('electron')
    
    app.on('ready', () => {
      globalShortcut.register('CommandOrControl+X', () => {
        console.log('CommandOrControl+X is pressed')
      })
    })

[Shortcuts within a BrowserWindow](#shortcuts-within-a-browserwindow)
---------------------------------------------------------------------

If you want to handle keyboard shortcuts for a [BrowserWindow](/docs/api/browser-window), you can use the `keyup` and `keydown` event listeners on the window object inside the renderer process.

    window.addEventListener('keyup', doSomething, true)

Note the third parameter `true` which means the listener will always receive key presses before other listeners so they can't have `stopPropagation()` called on them.

The [`before-input-event`](/docs/api/web-contents#event-before-input-event) event is emitted before dispatching `keydown` and `keyup` events in the page. It can be used to catch and handle custom shortcuts that are not visible in the menu.

If you don't want to do manual shortcut parsing there are libraries that do advanced key detection such as [mousetrap](https://github.com/ccampbell/mousetrap).

    Mousetrap.bind('4', () => { console.log('4') })
    Mousetrap.bind('?', () => { console.log('show shortcuts!') })
    Mousetrap.bind('esc', () => { console.log('escape') }, 'keyup')
    
    // combinations
    Mousetrap.bind('command+shift+k', () => { console.log('command shift k') })
    
    // map multiple combinations to the same callback
    Mousetrap.bind(['command+k', 'ctrl+k'], () => {
      console.log('command k or control k')
    
      // return false to prevent default behavior and stop event from bubbling
      return false
    })
    
    // gmail style sequences
    Mousetrap.bind('g i', () => { console.log('go to inbox') })
    Mousetrap.bind('* a', () => { console.log('select all') })
    
    // konami code!
    Mousetrap.bind('up up down down left right left right b a enter', () => {
      console.log('konami code')
    })

* * *

[Custom Linux Desktop Launcher Actions](#custom-linux-desktop-launcher-actions)
===============================================================================

On many Linux environments, you can add custom entries to its launcher by modifying the `.desktop` file. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). For details on a more generic implementation, see the [freedesktop.org Specification](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

**Launcher shortcuts of Audacious:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

Generally speaking, shortcuts are added by providing a `Name` and `Exec` property for each entry in the shortcuts menu. Unity will execute the `Exec` field once clicked by the user. The format is as follows:

    Actions=PlayPause;Next;Previous
    
    [Desktop Action PlayPause]
    Name=Play-Pause
    Exec=audacious -t
    OnlyShowIn=Unity;
    
    [Desktop Action Next]
    Name=Next
    Exec=audacious -f
    OnlyShowIn=Unity;
    
    [Desktop Action Previous]
    Name=Previous
    Exec=audacious -r
    OnlyShowIn=Unity;

Unity's preferred way of telling your application what to do is to use parameters. You can find these in your app in the global variable `process.argv`.

* * *

[Locales](#locales)
===================

> Locale values returned by `app.getLocale()`.

Electron uses Chromium's `l10n_util` library to fetch the locale. Possible values are listed below:

Language Code

Language Name

af

Afrikaans

am

Amharic

ar

Arabic

az

Azerbaijani

be

Belarusian

bg

Bulgarian

bh

Bihari

bn

Bengali

br

Breton

bs

Bosnian

ca

Catalan

co

Corsican

cs

Czech

cy

Welsh

da

Danish

de

German

de-AT

German (Austria)

de-CH

German (Switzerland)

de-DE

German (Germany)

el

Greek

en

English

en-AU

English (Australia)

en-CA

English (Canada)

en-GB

English (UK)

en-NZ

English (New Zealand)

en-US

English (US)

en-ZA

English (South Africa)

eo

Esperanto

es

Spanish

es-419

Spanish (Latin America)

et

Estonian

eu

Basque

fa

Persian

fi

Finnish

fil

Filipino

fo

Faroese

fr

French

fr-CA

French (Canada)

fr-CH

French (Switzerland)

fr-FR

French (France)

fy

Frisian

ga

Irish

gd

Scots Gaelic

gl

Galician

gn

Guarani

gu

Gujarati

ha

Hausa

haw

Hawaiian

he

Hebrew

hi

Hindi

hr

Croatian

hu

Hungarian

hy

Armenian

ia

Interlingua

id

Indonesian

is

Icelandic

it

Italian

it-CH

Italian (Switzerland)

it-IT

Italian (Italy)

ja

Japanese

jw

Javanese

ka

Georgian

kk

Kazakh

km

Cambodian

kn

Kannada

ko

Korean

ku

Kurdish

ky

Kyrgyz

la

Latin

ln

Lingala

lo

Laothian

lt

Lithuanian

lv

Latvian

mk

Macedonian

ml

Malayalam

mn

Mongolian

mo

Moldavian

mr

Marathi

ms

Malay

mt

Maltese

nb

Norwegian (Bokmal)

ne

Nepali

nl

Dutch

nn

Norwegian (Nynorsk)

no

Norwegian

oc

Occitan

om

Oromo

or

Oriya

pa

Punjabi

pl

Polish

ps

Pashto

pt

Portuguese

pt-BR

Portuguese (Brazil)

pt-PT

Portuguese (Portugal)

qu

Quechua

rm

Romansh

ro

Romanian

ru

Russian

sd

Sindhi

sh

Serbo-Croatian

si

Sinhalese

sk

Slovak

sl

Slovenian

sn

Shona

so

Somali

sq

Albanian

sr

Serbian

st

Sesotho

su

Sundanese

sv

Swedish

sw

Swahili

ta

Tamil

te

Telugu

tg

Tajik

th

Thai

ti

Tigrinya

tk

Turkmen

to

Tonga

tr

Turkish

tt

Tatar

tw

Twi

ug

Uighur

uk

Ukrainian

ur

Urdu

uz

Uzbek

vi

Vietnamese

xh

Xhosa

yi

Yiddish

yo

Yoruba

zh

Chinese

zh-CN

Chinese (Simplified)

zh-TW

Chinese (Traditional)

zu

Zulu

* * *

[Mac App Store Submission Guide](#mac-app-store-submission-guide)
=================================================================

Since v0.34.0, Electron allows submitting packaged apps to the Mac App Store (MAS). This guide provides information on: how to submit your app and the limitations of the MAS build.

**Note:** Submitting an app to Mac App Store requires enrolling in the [Apple Developer Program](https://developer.apple.com/support/compare-memberships/), which costs money.

[How to Submit Your App](#how-to-submit-your-app)
-------------------------------------------------

The following steps introduce a simple way to submit your app to Mac App Store. However, these steps do not ensure your app will be approved by Apple; you still need to read Apple's [Submitting Your App](https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) guide on how to meet the Mac App Store requirements.

### [Get Certificate](#get-certificate)

To submit your app to the Mac App Store, you first must get a certificate from Apple. You can follow these [existing guides](https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps) on web.

### [Get Team ID](#get-team-id)

Before signing your app, you need to know the Team ID of your account. To locate your Team ID, Sign in to [Apple Developer Center](https://developer.apple.com/account/), and click Membership in the sidebar. Your Team ID appears in the Membership Information section under the team name.

### [Sign Your App](#sign-your-app)

After finishing the preparation work, you can package your app by following [Application Distribution](/docs/tutorial/application-distribution), and then proceed to signing your app.

First, you have to add a `ElectronTeamID` key to your app's `Info.plist`, which has your Team ID as its value:

    <plist version="1.0">
    <dict>
      ...
      <key>ElectronTeamID</key>
      <string>TEAM_ID</string>
    </dict>
    </plist>

Then, you need to prepare three entitlements files.

`child.plist`:

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
        <key>com.apple.security.app-sandbox</key>
        <true/>
        <key>com.apple.security.inherit</key>
        <true/>
      </dict>
    </plist>

`parent.plist`:

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
        <key>com.apple.security.app-sandbox</key>
        <true/>
        <key>com.apple.security.application-groups</key>
        <string>TEAM_ID.your.bundle.id</string>
      </dict>
    </plist>

`loginhelper.plist`:

    <?xml version="1.0" encoding="UTF-8"?>
    <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
    <plist version="1.0">
      <dict>
        <key>com.apple.security.app-sandbox</key>
        <true/>
      </dict>
    </plist>

You have to replace `TEAM_ID` with your Team ID, and replace `your.bundle.id` with the Bundle ID of your app.

And then sign your app with the following script:

    #!/bin/bash
    
    # Name of your app.
    APP="YourApp"
    # The path of your app to sign.
    APP_PATH="/path/to/YourApp.app"
    # The path to the location you want to put the signed package.
    RESULT_PATH="~/Desktop/$APP.pkg"
    # The name of certificates you requested.
    APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
    INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
    # The path of your plist files.
    CHILD_PLIST="/path/to/child.plist"
    PARENT_PLIST="/path/to/parent.plist"
    LOGINHELPER_PLIST="/path/to/loginhelper.plist"
    
    FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"
    
    codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
    codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
    codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"
    codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
    codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
    codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
    codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
    codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
    codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
    codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"
    
    productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"

If you are new to app sandboxing under macOS, you should also read through Apple's [Enabling App Sandbox](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html) to have a basic idea, then add keys for the permissions needed by your app to the entitlements files.

Apart from manually signing your app, you can also choose to use the [electron-osx-sign](https://github.com/electron-userland/electron-osx-sign) module to do the job.

#### [Sign Native Modules](#sign-native-modules)

Native modules used in your app also need to be signed. If using electron-osx-sign, be sure to include the path to the built binaries in the argument list:

    electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule

Also note that native modules may have intermediate files produced which should not be included (as they would also need to be signed). If you use [electron-packager](https://github.com/electron-userland/electron-packager) before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Versions 8.1.0 and later ignore those files by default.

### [Upload Your App](#upload-your-app)

After signing your app, you can use Application Loader to upload it to iTunes Connect for processing, making sure you have [created a record](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html) before uploading.

### [Submit Your App for Review](#submit-your-app-for-review)

After these steps, you can [submit your app for review](https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html).

[Limitations of MAS Build](#limitations-of-mas-build)
-----------------------------------------------------

In order to satisfy all requirements for app sandboxing, the following modules have been disabled in the MAS build:

*   `crashReporter`
*   `autoUpdater`

and the following behaviors have been changed:

*   Video capture may not work for some machines.
*   Certain accessibility features may not work.
*   Apps will not be aware of DNS changes.

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing](https://developer.apple.com/app-sandboxing/) for more information.

### [Additional Entitlements](#additional-entitlements)

Depending on which Electron APIs your app uses, you may need to add additional entitlements to your `parent.plist` file to be able to use these APIs from your app's Mac App Store build.

#### [Network Access](#network-access)

Enable outgoing network connections to allow your app to connect to a server:

    <key>com.apple.security.network.client</key>
    <true/>

Enable incoming network connections to allow your app to open a network listening socket:

    <key>com.apple.security.network.server</key>
    <true/>

See the [Enabling Network Access documentation](https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9) for more details.

#### [dialog.showOpenDialog](#dialogshowopendialog)

    <key>com.apple.security.files.user-selected.read-only</key>
    <true/>

See the [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) for more details.

#### [dialog.showSaveDialog](#dialogshowsavedialog)

    <key>com.apple.security.files.user-selected.read-write</key>
    <true/>

See the [Enabling User-Selected File Access documentation](https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6) for more details.

[Cryptographic Algorithms Used by Electron](#cryptographic-algorithms-used-by-electron)
---------------------------------------------------------------------------------------

Depending on the country and region you are located, Mac App Store may require documenting the cryptographic algorithms used in your app, and even ask you to submit a copy of U.S. Encryption Registration (ERN) approval.

Electron uses following cryptographic algorithms:

*   AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
*   HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
*   ECDSA - ANS X9.62–2005
*   ECDH - ANS X9.63–2001
*   HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
*   PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
*   RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
*   SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
*   Blowfish - [https://www.schneier.com/cryptography/blowfish/](https://www.schneier.com/cryptography/blowfish/)
*   CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
*   DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
*   DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
*   DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
*   EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
*   IDEA - "On the Design and Security of Block Ciphers" book by X. Lai
*   MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
*   MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
*   MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
*   MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
*   RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
*   RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
*   RC5 - [http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf](http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf)
*   RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

On how to get the ERN approval, you can reference the article: [How to legally submit an app to Apple’s App Store when it uses encryption (or how to obtain an ERN)](https://carouselapps.com/2015/12/15/legally-submit-app-apples-app-store-uses-encryption-obtain-ern/).

* * *

[MacOS Dock](#macos-dock)
=========================

Electron has APIs to configure the app's icon in the macOS Dock. A macOS-only API exists to create a custom dock menu, but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](/docs/tutorial/recent-documents) and [application progress](/docs/tutorial/progress-bar).

The custom dock is commonly used to add shortcuts to tasks the user wouldn't want to open the whole app window for.

**Dock menu of Terminal.app:**

![Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

To set your custom dock menu, you can use the `app.dock.setMenu` API, which is only available on macOS:

    const { app, Menu } = require('electron')
    
    const dockMenu = Menu.buildFromTemplate([
      {
        label: 'New Window',
        click () { console.log('New Window') }
      }, {
        label: 'New Window with Settings',
        submenu: [
          { label: 'Basic' },
          { label: 'Pro' }
        ]
      },
      { label: 'New Command...' }
    ])
    
    app.dock.setMenu(dockMenu)

* * *

[MemoryInfo Object](#memoryinfo-object)
=======================================

*   `pid` Integer - Process id of the process.
*   `workingSetSize` Integer - The amount of memory currently pinned to actual physical RAM.
*   `peakWorkingSetSize` Integer - The maximum amount of memory that has ever been pinned to actual physical RAM. On macOS its value will always be 0.
*   `privateBytes` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content.
*   `sharedBytes` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself

Note that all statistics are reported in Kilobytes.

* * *

[MemoryUsageDetails Object](#memoryusagedetails-object)
=======================================================

*   `count` Number
*   `size` Number
*   `liveSize` Number

* * *

[Class: Menu](#class-menu)
--------------------------

> Create native application menus and context menus.

Process: [Main](/docs/glossary#main-process)

### [`new Menu()`](#new-menu)

Creates a new menu.

### [Static Methods](#static-methods)

The `menu` class has the following static methods:

#### [`Menu.setApplicationMenu(menu)`](#menusetapplicationmenumenu)

*   `menu` Menu | null

Sets `menu` as the application menu on macOS. On Windows and Linux, the `menu` will be set as each window's top menu.

Passing `null` will remove the menu bar on Windows and Linux but has no effect on macOS.

**Note:** This API has to be called after the `ready` event of `app` module.

#### [`Menu.getApplicationMenu()`](#menugetapplicationmenu)

Returns `Menu | null` - The application menu, if set, or `null`, if not set.

**Note:** The returned `Menu` instance doesn't support dynamic addition or removal of menu items. [Instance properties](#instance-properties) can still be dynamically modified.

#### [`Menu.sendActionToFirstResponder(action)` _macOS_](#menusendactiontofirstresponderaction-macos)

*   `action` String

Sends the `action` to the first responder of application. This is used for emulating default macOS menu behaviors. Usually you would use the [`role`](/docs/api/menu-item#roles) property of a [`MenuItem`](/docs/api/menu-item).

See the [macOS Cocoa Event Handling Guide](https://developer.apple.com/library/mac/documentation/Cocoa/Conceptual/EventOverview/EventArchitecture/EventArchitecture.html#//apple_ref/doc/uid/10000060i-CH3-SW7) for more information on macOS' native actions.

#### [`Menu.buildFromTemplate(template)`](#menubuildfromtemplatetemplate)

*   `template` MenuItemConstructorOptions\[\]

Returns `Menu`

Generally, the `template` is an array of `options` for constructing a [MenuItem](/docs/api/menu-item). The usage can be referenced above.

You can also attach other fields to the element of the `template` and they will become properties of the constructed menu items.

### [Instance Methods](#instance-methods)

The `menu` object has the following instance methods:

#### [`menu.popup(options)`](#menupopupoptions)

*   `options` Object (optional)
    
    *   `window` [BrowserWindow](/docs/api/browser-window) (optional) - Default is the focused window.
    *   `x` Number (optional) - Default is the current mouse cursor position. Must be declared if `y` is declared.
    *   `y` Number (optional) - Default is the current mouse cursor position. Must be declared if `x` is declared.
    *   `positioningItem` Number (optional) _macOS_ - The index of the menu item to be positioned under the mouse cursor at the specified coordinates. Default is -1.
    *   `callback` Function (optional) - Called when menu is closed.

Pops up this menu as a context menu in the [`BrowserWindow`](/docs/api/browser-window).

#### [`menu.closePopup([browserWindow])`](#menuclosepopupbrowserwindow)

*   `browserWindow` [BrowserWindow](/docs/api/browser-window) (optional) - Default is the focused window.

Closes the context menu in the `browserWindow`.

#### [`menu.append(menuItem)`](#menuappendmenuitem)

*   `menuItem` [MenuItem](/docs/api/menu-item)

Appends the `menuItem` to the menu.

#### [`menu.getMenuItemById(id)`](#menugetmenuitembyidid)

*   `id` String

Returns `MenuItem` the item with the specified `id`

#### [`menu.insert(pos, menuItem)`](#menuinsertpos-menuitem)

*   `pos` Integer
*   `menuItem` [MenuItem](/docs/api/menu-item)

Inserts the `menuItem` to the `pos` position of the menu.

### [Instance Events](#instance-events)

Objects created with `new Menu` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### [Event: 'menu-will-show'](#event-menu-will-show)

Returns:

*   `event` Event

Emitted when `menu.popup()` is called.

#### [Event: 'menu-will-close'](#event-menu-will-close)

Returns:

*   `event` Event

Emitted when a popup is closed either manually or with `menu.closePopup()`.

### [Instance Properties](#instance-properties)

`menu` objects also have the following properties:

#### [`menu.items`](#menuitems)

A `MenuItem[]` array containing the menu's items.

Each `Menu` consists of multiple [`MenuItem`](/docs/api/menu-item)s and each `MenuItem` can have a submenu.

### [Instance Events](#instance-events)

Objects created with `new Menu` or returned by `Menu.buildFromTemplate` emit the following events:

[Examples](#examples)
---------------------

The `Menu` class is only available in the main process, but you can also use it in the render process via the [`remote`](/docs/api/remote) module.

### [Main process](#main-process)

An example of creating the application menu in the main process with the simple template API:

    const { app, Menu } = require('electron')
    
    const template = [
      {
        label: 'Edit',
        submenu: [
          { role: 'undo' },
          { role: 'redo' },
          { type: 'separator' },
          { role: 'cut' },
          { role: 'copy' },
          { role: 'paste' },
          { role: 'pasteandmatchstyle' },
          { role: 'delete' },
          { role: 'selectall' }
        ]
      },
      {
        label: 'View',
        submenu: [
          { role: 'reload' },
          { role: 'forcereload' },
          { role: 'toggledevtools' },
          { type: 'separator' },
          { role: 'resetzoom' },
          { role: 'zoomin' },
          { role: 'zoomout' },
          { type: 'separator' },
          { role: 'togglefullscreen' }
        ]
      },
      {
        role: 'window',
        submenu: [
          { role: 'minimize' },
          { role: 'close' }
        ]
      },
      {
        role: 'help',
        submenu: [
          {
            label: 'Learn More',
            click () { require('electron').shell.openExternal('https://electronjs.org') }
          }
        ]
      }
    ]
    
    if (process.platform === 'darwin') {
      template.unshift({
        label: app.getName(),
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      })
    
      // Edit menu
      template[1].submenu.push(
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startspeaking' },
            { role: 'stopspeaking' }
          ]
        }
      )
    
      // Window menu
      template[3].submenu = [
        { role: 'close' },
        { role: 'minimize' },
        { role: 'zoom' },
        { type: 'separator' },
        { role: 'front' }
      ]
    }
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)

### [Render process](#render-process)

Below is an example of creating a menu dynamically in a web page (render process) by using the [`remote`](/docs/api/remote) module, and showing it when the user right clicks the page:

    <!-- index.html -->
    <script>
    const { remote } = require('electron')
    const { Menu, MenuItem } = remote
    
    const menu = new Menu()
    menu.append(new MenuItem({ label: 'MenuItem1', click() { console.log('item 1 clicked') } }))
    menu.append(new MenuItem({ type: 'separator' }))
    menu.append(new MenuItem({ label: 'MenuItem2', type: 'checkbox', checked: true }))
    
    window.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      menu.popup({ window: remote.getCurrentWindow() })
    }, false)
    </script>

[Notes on macOS Application Menu](#notes-on-macos-application-menu)
-------------------------------------------------------------------

macOS has a completely different style of application menu from Windows and Linux. Here are some notes on making your app's menu more native-like.

### [Standard Menus](#standard-menus)

On macOS there are many system-defined standard menus, like the `Services` and `Windows` menus. To make your menu a standard menu, you should set your menu's `role` to one of the following and Electron will recognize them and make them become standard menus:

*   `window`
*   `help`
*   `services`

### [Standard Menu Item Actions](#standard-menu-item-actions)

macOS has provided standard actions for some menu items, like `About xxx`, `Hide xxx`, and `Hide Others`. To set the action of a menu item to a standard action, you should set the `role` attribute of the menu item.

### [Main Menu's Name](#main-menus-name)

On macOS the label of the application menu's first item is always your app's name, no matter what label you set. To change it, modify your app bundle's `Info.plist` file. See [About Information Property List Files](https://developer.apple.com/library/ios/documentation/general/Reference/InfoPlistKeyReference/Articles/AboutInformationPropertyListFiles.html) for more information.

[Setting Menu for Specific Browser Window (_Linux_ _Windows_)](#setting-menu-for-specific-browser-window-linux-windows)
-----------------------------------------------------------------------------------------------------------------------

The [`setMenu` method](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsetmenumenu-linux-windows) of browser windows can set the menu of certain browser windows.

[Menu Item Position](#menu-item-position)
-----------------------------------------

You can make use of `before`, `after`, `beforeGroupContaining`, `afterGroupContaining` and `id` to control how the item will be placed when building a menu with `Menu.buildFromTemplate`.

*   `before` - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
*   `after` - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
*   `beforeGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
*   `afterGroupContaining` - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

By default, items will be inserted in the order they exist in the template unless one of the specified positioning keywords is used.

### [Examples](#examples)

Template:

    [
      { id: '1', label: 'one' },
      { id: '2', label: 'two' },
      { id: '3', label: 'three' },
      { id: '4', label: 'four' }
    ]

Menu:

    - 1
    - 2
    - 3
    - 4

Template:

    [
      { id: '1', label: 'one' },
      { type: 'separator' },
      { id: '3', label: 'three', beforeGroupContaining: ['1'] },
      { id: '4', label: 'four', afterGroupContaining: ['2'] },
      { type: 'separator' },
      { id: '2', label: 'two' }
    ]

Menu:

    - 3
    - 4
    - ---
    - 1
    - ---
    - 2

Template:

    [
      { id: '1', label: 'one', after: ['3'] },
      { id: '2', label: 'two', before: ['1'] },
      { id: '3', label: 'three' }
    ]

Menu:

    - ---
    - 3
    - 2
    - 1

* * *

[Class: MenuItem](#class-menuitem)
----------------------------------

> Add items to native application menus and context menus.

Process: [Main](/docs/glossary#main-process)

See [`Menu`](/docs/api/menu) for examples.

### [`new MenuItem(options)`](#new-menuitemoptions)

*   `options` Object
    
    *   `click` Function (optional) - Will be called with `click(menuItem, browserWindow, event)` when the menu item is clicked.
        
        *   `menuItem` MenuItem
        *   `browserWindow` [BrowserWindow](/docs/api/browser-window)
        *   `event` Event
    *   `role` String (optional) - Define the action of the menu item, when specified the `click` property will be ignored. See [roles](#roles).
    *   `type` String (optional) - Can be `normal`, `separator`, `submenu`, `checkbox` or `radio`.
    *   `label` String (optional)
    *   `sublabel` String (optional)
    *   `accelerator` [Accelerator](/docs/api/accelerator) (optional)
    *   `icon` ([NativeImage](/docs/api/native-image) | String) (optional)
    *   `enabled` Boolean (optional) - If false, the menu item will be greyed out and unclickable.
    *   `visible` Boolean (optional) - If false, the menu item will be entirely hidden.
    *   `checked` Boolean (optional) - Should only be specified for `checkbox` or `radio` type menu items.
    *   `registerAccelerator` Boolean (optional) - If false, the accelerator won't be registered with the system, but it will still be displayed. Defaults to true.
    *   `submenu` (MenuItemConstructorOptions\[\] | [Menu](/docs/api/menu)) (optional) - Should be specified for `submenu` type menu items. If `submenu` is specified, the `type: 'submenu'` can be omitted. If the value is not a [`Menu`](/docs/api/menu) then it will be automatically converted to one using `Menu.buildFromTemplate`.
    *   `id` String (optional) - Unique within a single menu. If defined then it can be used as a reference to this item by the position attribute.
    *   `before` String[](/docs/api/optional) - Inserts this item before the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu. Also implies that the menu item in question should be placed in the same “group” as the item.
    *   `after` String[](/docs/api/optional) - Inserts this item after the item with the specified label. If the referenced item doesn't exist the item will be inserted at the end of the menu.
    *   `beforeGroupContaining` String[](/docs/api/optional) - Provides a means for a single context menu to declare the placement of their containing group before the containing group of the item with the specified label.
    *   `afterGroupContaining` String[](/docs/api/optional) - Provides a means for a single context menu to declare the placement of their containing group after the containing group of the item with the specified label.

### [Roles](#roles)

Roles allow menu items to have predefined behaviors.

It is best to specify `role` for any menu item that matches a standard role, rather than trying to manually implement the behavior in a `click` function. The built-in `role` behavior will give the best native experience.

The `label` and `accelerator` values are optional when using a `role` and will default to appropriate values for each platform.

Every menu item must have either a `role`, `label`, or in the case of a separator a `type`.

The `role` property can have following values:

*   `undo`
*   `redo`
*   `cut`
*   `copy`
*   `paste`
*   `pasteAndMatchStyle`
*   `selectAll`
*   `delete`
*   `minimize` - Minimize current window.
*   `close` - Close current window.
*   `quit` - Quit the application.
*   `reload` - Reload the current window.
*   `forceReload` - Reload the current window ignoring the cache.
*   `toggleDevTools` - Toggle developer tools in the current window.
*   `toggleFullScreen` - Toggle full screen mode on the current window.
*   `resetZoom` - Reset the focused page's zoom level to the original size.
*   `zoomIn` - Zoom in the focused page by 10%.
*   `zoomOut` - Zoom out the focused page by 10%.
*   `editMenu` - Whole default "Edit" menu (Undo, Copy, etc.).
*   `windowMenu` - Whole default "Window" menu (Minimize, Close, etc.).

The following additional roles are available on _macOS_:

*   `about` - Map to the `orderFrontStandardAboutPanel` action.
*   `hide` - Map to the `hide` action.
*   `hideOthers` - Map to the `hideOtherApplications` action.
*   `unhide` - Map to the `unhideAllApplications` action.
*   `startSpeaking` - Map to the `startSpeaking` action.
*   `stopSpeaking` - Map to the `stopSpeaking` action.
*   `front` - Map to the `arrangeInFront` action.
*   `zoom` - Map to the `performZoom` action.
*   `toggleTabBar` - Map to the `toggleTabBar` action.
*   `selectNextTab` - Map to the `selectNextTab` action.
*   `selectPreviousTab` - Map to the `selectPreviousTab` action.
*   `mergeAllWindows` - Map to the `mergeAllWindows` action.
*   `moveTabToNewWindow` - Map to the `moveTabToNewWindow` action.
*   `window` - The submenu is a "Window" menu.
*   `help` - The submenu is a "Help" menu.
*   `services` - The submenu is a "Services" menu.
*   `recentDocuments` - The submenu is an "Open Recent" menu.
*   `clearRecentDocuments` - Map to the `clearRecentDocuments` action.

When specifying a `role` on macOS, `label` and `accelerator` are the only options that will affect the menu item. All other options will be ignored. Lowercase `role`, e.g. `toggledevtools`, is still supported.

**Nota Bene:** The `enabled` and `visibility` properties are not available for top-level menu items in the tray on MacOS.

### [Instance Properties](#instance-properties)

The following properties are available on instances of `MenuItem`:

#### [`menuItem.enabled`](#menuitemenabled)

A `Boolean` indicating whether the item is enabled, this property can be dynamically changed.

#### [`menuItem.visible`](#menuitemvisible)

A `Boolean` indicating whether the item is visible, this property can be dynamically changed.

#### [`menuItem.checked`](#menuitemchecked)

A `Boolean` indicating whether the item is checked, this property can be dynamically changed.

A `checkbox` menu item will toggle the `checked` property on and off when selected.

A `radio` menu item will turn on its `checked` property when clicked, and will turn off that property for all adjacent items in the same menu.

You can add a `click` function for additional behavior.

#### [`menuItem.label`](#menuitemlabel)

A `String` representing the menu items visible label.

#### [`menuItem.click`](#menuitemclick)

A `Function` that is fired when the MenuItem receives a click event.

* * *

[MimeTypedBuffer Object](#mimetypedbuffer-object)
=================================================

*   `mimeType` String - The mimeType of the Buffer that you are sending.
*   `data` Buffer - The actual Buffer content.

* * *

[Mojave Dark Mode](#mojave-dark-mode)
=====================================

In macOS 10.14 Mojave, Apple introduced a new [system-wide dark mode](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/dark-mode/) for all macOS computers. By default Electron apps do not automatically adjust their UI and native interfaces to the dark mode setting when it's enabled. This is primarily due to Apple's own guidelines saying you **shouldn't** use the dark mode native interfaces if your app's own interfaces don't support dark mode themselves.

If your app does have a dark mode, you can make your Electron app follow the system-wide dark mode setting.

[Automatically updating the native interfaces](#automatically-updating-the-native-interfaces)
---------------------------------------------------------------------------------------------

"Native Interfaces" include the file picker, window border, dialogs, context menus and more; basically anything where the UI comes from macOS and not your app. In order to make these interfaces update to dark mode automatically, you need to set the `NSRequiresAquaSystemAppearance` key in your app's `Info.plist` file to `false`. E.g.

    <plist>
    <dict>
      ...
      <key>NSRequiresAquaSystemAppearance</key>
      <false />
      ...
    </dict>
    </plist>

If you are using [`electron-packager` >= 12.2.0](https://github.com/electron-userland/electron-packager) or [`electron-forge` >= 6](https://github.com/electron-userland/electron-forge) you can set the [`darwinDarkModeSupport`](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) option when packaging and this key will be set for you.

If you are using [`electron-builder` >= 20.37.0](https://github.com/electron-userland/electron-builder) you can set the [`darkModeSupport`](https://www.electron.build/configuration/mac.html) option.

[Automatically updating your own interfaces](#automatically-updating-your-own-interfaces)
-----------------------------------------------------------------------------------------

If your app has its own dark mode you should toggle it on and off in sync with the system's dark mode setting. You can do this by listening for the theme changed event on Electron's `systemPreferences` module. E.g.

    const { systemPreferences } = require('electron')
    
    systemPreferences.subscribeNotification(
      'AppleInterfaceThemeChangedNotification',
      function theThemeHasChanged () {
        updateMyAppTheme(systemPreferences.isDarkMode())
      }
    )

* * *

[Multithreading](#multithreading)
=================================

With [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), it is possible to run JavaScript in OS-level threads.

[Multi-threaded Node.js](#multi-threaded-nodejs)
------------------------------------------------

It is possible to use Node.js features in Electron's Web Workers, to do so the `nodeIntegrationInWorker` option should be set to `true` in `webPreferences`.

    let win = new BrowserWindow({
      webPreferences: {
        nodeIntegrationInWorker: true
      }
    })

The `nodeIntegrationInWorker` can be used independent of `nodeIntegration`, but `sandbox` must not be set to `true`.

[Available APIs](#available-apis)
---------------------------------

All built-in modules of Node.js are supported in Web Workers, and `asar` archives can still be read with Node.js APIs. However none of Electron's built-in modules can be used in a multi-threaded environment.

[Native Node.js modules](#native-nodejs-modules)
------------------------------------------------

Any native Node.js module can be loaded directly in Web Workers, but it is strongly recommended not to do so. Most existing native modules have been written assuming single-threaded environment, using them in Web Workers will lead to crashes and memory corruptions.

Note that even if a native Node.js module is thread-safe it's still not safe to load it in a Web Worker because the `process.dlopen` function is not thread safe.

The only way to load a native module safely for now, is to make sure the app loads no native modules after the Web Workers get started.

    process.dlopen = () => {
      throw new Error('Load native module is not safe')
    }
    let worker = new Worker('script.js')

* * *

[Native File Drag & Drop](#native-file-drag--drop)
==================================================

Certain kinds of applications that manipulate files might want to support the operating system's native file drag & drop feature. Dragging files into web content is common and supported by many websites. Electron additionally supports dragging files and content out from web content into the operating system's world.

To implement this feature in your app, you need to call `webContents.startDrag(item)` API in response to the `ondragstart` event.

In your renderer process, handle the `ondragstart` event and forward the information to your main process.

    <a href="#" id="drag">item</a>
    <script type="text/javascript" charset="utf-8">
      document.getElementById('drag').ondragstart = (event) => {
        event.preventDefault()
        ipcRenderer.send('ondragstart', '/path/to/item')
      }
    </script>

Then, in the main process, augment the event with a path to the file that is being dragged and an icon.

    const { ipcMain } = require('electron')
    
    ipcMain.on('ondragstart', (event, filePath) => {
      event.sender.startDrag({
        file: filePath,
        icon: '/path/to/icon.png'
      })
    })

* * *

[nativeImage](#nativeimage)
===========================

> Create tray, dock, and application icons using PNG or JPG files.

Process: [Main](/docs/glossary#main-process), [Renderer](/docs/glossary#renderer-process)

In Electron, for the APIs that take images, you can pass either file paths or `NativeImage` instances. An empty image will be used when `null` is passed.

For example, when creating a tray or setting a window's icon, you can pass an image file path as a `String`:

    const { BrowserWindow, Tray } = require('electron')
    
    const appIcon = new Tray('/Users/somebody/images/icon.png')
    let win = new BrowserWindow({ icon: '/Users/somebody/images/window.png' })
    console.log(appIcon, win)

Or read the image from the clipboard which returns a `NativeImage`:

    const { clipboard, Tray } = require('electron')
    const image = clipboard.readImage()
    const appIcon = new Tray(image)
    console.log(appIcon)

[Supported Formats](#supported-formats)
---------------------------------------

Currently `PNG` and `JPEG` image formats are supported. `PNG` is recommended because of its support for transparency and lossless compression.

On Windows, you can also load `ICO` icons from file paths. For best visual quality it is recommended to include at least the following sizes in the:

*   Small icon
*   16x16 (100% DPI scale)
*   20x20 (125% DPI scale)
*   24x24 (150% DPI scale)
*   32x32 (200% DPI scale)
*   Large icon
*   32x32 (100% DPI scale)
*   40x40 (125% DPI scale)
*   48x48 (150% DPI scale)
*   64x64 (200% DPI scale)
*   256x256

Check the _Size requirements_ section in [this article](https://msdn.microsoft.com/en-us/library/windows/desktop/dn742485(v=vs.85).aspx).

[High Resolution Image](#high-resolution-image)
-----------------------------------------------

On platforms that have high-DPI support such as Apple Retina displays, you can append `@2x` after image's base filename to mark it as a high resolution image.

For example if `icon.png` is a normal image that has standard resolution, then `icon@2x.png` will be treated as a high resolution image that has double DPI density.

If you want to support displays with different DPI densities at the same time, you can put images with different sizes in the same folder and use the filename without DPI suffixes. For example:

    images/
    ├── icon.png
    ├── icon@2x.png
    └── icon@3x.png

    const { Tray } = require('electron')
    let appIcon = new Tray('/Users/somebody/images/icon.png')
    console.log(appIcon)

Following suffixes for DPI are also supported:

*   `@1x`
*   `@1.25x`
*   `@1.33x`
*   `@1.4x`
*   `@1.5x`
*   `@1.8x`
*   `@2x`
*   `@2.5x`
*   `@3x`
*   `@4x`
*   `@5x`

[Template Image](#template-image)
---------------------------------

Template images consist of black and an alpha channel. Template images are not intended to be used as standalone images and are usually mixed with other content to create the desired final appearance.

The most common case is to use template images for a menu bar icon so it can adapt to both light and dark menu bars.

**Note:** Template image is only supported on macOS.

To mark an image as a template image, its filename should end with the word `Template`. For example:

*   `xxxTemplate.png`
*   `xxxTemplate@2x.png`

[Methods](#methods)
-------------------

The `nativeImage` module has the following methods, all of which return an instance of the `NativeImage` class:

### [`nativeImage.createEmpty()`](#nativeimagecreateempty)

Returns `NativeImage`

Creates an empty `NativeImage` instance.

### [`nativeImage.createFromPath(path)`](#nativeimagecreatefrompathpath)

*   `path` String

Returns `NativeImage`

Creates a new `NativeImage` instance from a file located at `path`. This method returns an empty image if the `path` does not exist, cannot be read, or is not a valid image.

    const nativeImage = require('electron').nativeImage
    
    let image = nativeImage.createFromPath('/Users/somebody/images/icon.png')
    console.log(image)

### [`nativeImage.createFromBuffer(buffer[, options])`](#nativeimagecreatefrombufferbuffer-options)

*   `buffer` [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer)
*   `options` Object (optional)
    
    *   `width` Integer (optional) - Required for bitmap buffers.
    *   `height` Integer (optional) - Required for bitmap buffers.
    *   `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `NativeImage`

Creates a new `NativeImage` instance from `buffer`.

### [`nativeImage.createFromDataURL(dataURL)`](#nativeimagecreatefromdataurldataurl)

*   `dataURL` String

Returns `NativeImage`

Creates a new `NativeImage` instance from `dataURL`.

### [`nativeImage.createFromNamedImage(imageName[, hslShift])` _macOS_](#nativeimagecreatefromnamedimageimagename-hslshift-macos)

*   `imageName` String
*   `hslShift` Number\[\]

Returns `NativeImage`

Creates a new `NativeImage` instance from the NSImage that maps to the given image name. See [`NSImageName`](https://developer.apple.com/documentation/appkit/nsimagename?language=objc) for a list of possible values.

The `hslShift` is applied to the image with the following rules

*   `hsl_shift[0]` (hue): The absolute hue value for the image - 0 and 1 map to 0 and 360 on the hue color wheel (red).
*   `hsl_shift[1]` (saturation): A saturation shift for the image, with the following key values: 0 = remove all color. 0.5 = leave unchanged. 1 = fully saturate the image.
*   `hsl_shift[2]` (lightness): A lightness shift for the image, with the following key values: 0 = remove all lightness (make all pixels black). 0.5 = leave unchanged. 1 = full lightness (make all pixels white).

This means that `[-1, 0, 1]` will make the image completely white and `[-1, 1, 0]` will make the image completely black.

[Class: NativeImage](#class-nativeimage)
----------------------------------------

> Natively wrap images such as tray, dock, and application icons.

Process: [Main](/docs/glossary#main-process), [Renderer](/docs/glossary#renderer-process)

### [Instance Methods](#instance-methods)

The following methods are available on instances of the `NativeImage` class:

#### [`image.toPNG([options])`](#imagetopngoptions)

*   `options` Object (optional)
    
    *   `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `PNG` encoded data.

#### [`image.toJPEG(quality)`](#imagetojpegquality)

*   `quality` Integer (**required**) - Between 0 - 100.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's `JPEG` encoded data.

#### [`image.toBitmap([options])`](#imagetobitmapoptions)

*   `options` Object (optional)
    
    *   `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains a copy of the image's raw bitmap pixel data.

#### [`image.toDataURL([options])`](#imagetodataurloptions)

*   `options` Object (optional)
    
    *   `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `String` - The data URL of the image.

#### [`image.getBitmap([options])`](#imagegetbitmapoptions)

*   `options` Object (optional)
    
    *   `scaleFactor` Double (optional) - Defaults to 1.0.

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that contains the image's raw bitmap pixel data.

The difference between `getBitmap()` and `toBitmap()` is, `getBitmap()` does not copy the bitmap data, so you have to use the returned Buffer immediately in current event loop tick, otherwise the data might be changed or destroyed.

#### [`image.getNativeHandle()` _macOS_](#imagegetnativehandle-macos)

Returns `Buffer` - A [Buffer](https://nodejs.org/api/buffer.html#buffer_class_buffer) that stores C pointer to underlying native handle of the image. On macOS, a pointer to `NSImage` instance would be returned.

Notice that the returned pointer is a weak pointer to the underlying native image instead of a copy, so you _must_ ensure that the associated `nativeImage` instance is kept around.

#### [`image.isEmpty()`](#imageisempty)

Returns `Boolean` - Whether the image is empty.

#### [`image.getSize()`](#imagegetsize)

Returns [`Size`](/docs/api/structures/size)

#### [`image.setTemplateImage(option)`](#imagesettemplateimageoption)

*   `option` Boolean

Marks the image as a template image.

#### [`image.isTemplateImage()`](#imageistemplateimage)

Returns `Boolean` - Whether the image is a template image.

#### [`image.crop(rect)`](#imagecroprect)

*   `rect` [Rectangle](/docs/api/structures/rectangle) - The area of the image to crop.

Returns `NativeImage` - The cropped image.

#### [`image.resize(options)`](#imageresizeoptions)

*   `options` Object
    
    *   `width` Integer (optional) - Defaults to the image's width.
    *   `height` Integer (optional) - Defaults to the image's height.
    *   `quality` String (optional) - The desired quality of the resize image. Possible values are `good`, `better` or `best`. The default is `best`. These values express a desired quality/speed tradeoff. They are translated into an algorithm-specific method that depends on the capabilities (CPU, GPU) of the underlying platform. It is possible for all three methods to be mapped to the same algorithm on a given platform.

Returns `NativeImage` - The resized image.

If only the `height` or the `width` are specified then the current aspect ratio will be preserved in the resized image.

#### [`image.getAspectRatio()`](#imagegetaspectratio)

Returns `Float` - The image's aspect ratio.

#### [`image.addRepresentation(options)`](#imageaddrepresentationoptions)

*   `options` Object
    
    *   `scaleFactor` Double - The scale factor to add the image representation for.
    *   `width` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
    *   `height` Integer (optional) - Defaults to 0. Required if a bitmap buffer is specified as `buffer`.
    *   `buffer` Buffer (optional) - The buffer containing the raw image data.
    *   `dataURL` String (optional) - The data URL containing either a base 64 encoded PNG or JPEG image.

Add an image representation for a specific scale factor. This can be used to explicitly add different scale factor representations to an image. This can be called on empty images.

* * *

[net](#net)
===========

> Issue HTTP/HTTPS requests using Chromium's native networking library

Process: [Main](/docs/glossary#main-process)

The `net` module is a client-side API for issuing HTTP(S) requests. It is similar to the [HTTP](https://nodejs.org/api/http.html) and [HTTPS](https://nodejs.org/api/https.html) modules of Node.js but uses Chromium's native networking library instead of the Node.js implementation, offering better support for web proxies.

The following is a non-exhaustive list of why you may consider using the `net` module instead of the native Node.js modules:

*   Automatic management of system proxy configuration, support of the wpad protocol and proxy pac configuration files.
*   Automatic tunneling of HTTPS requests.
*   Support for authenticating proxies using basic, digest, NTLM, Kerberos or negotiate authentication schemes.
*   Support for traffic monitoring proxies: Fiddler-like proxies used for access control and monitoring.

The `net` module API has been specifically designed to mimic, as closely as possible, the familiar Node.js API. The API components including classes, methods, properties and event names are similar to those commonly used in Node.js.

For instance, the following example quickly shows how the `net` API might be used:

    const { app } = require('electron')
    app.on('ready', () => {
      const { net } = require('electron')
      const request = net.request('https://github.com')
      request.on('response', (response) => {
        console.log(`STATUS: ${response.statusCode}`)
        console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
        response.on('data', (chunk) => {
          console.log(`BODY: ${chunk}`)
        })
        response.on('end', () => {
          console.log('No more data in response.')
        })
      })
      request.end()
    })

By the way, it is almost identical to how you would normally use the [HTTP](https://nodejs.org/api/http.html)/[HTTPS](https://nodejs.org/api/https.html) modules of Node.js

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

[Methods](#methods)
-------------------

The `net` module has the following methods:

### [`net.request(options)`](#netrequestoptions)

*   `options` (Object | String) - The `ClientRequest` constructor options.

Returns [`ClientRequest`](/docs/api/client-request)

Creates a [`ClientRequest`](/docs/api/client-request) instance using the provided `options` which are directly forwarded to the `ClientRequest` constructor. The `net.request` method would be used to issue both secure and insecure HTTP requests according to the specified protocol scheme in the `options` object.

* * *

[netLog](#netlog)
=================

> Logging network events for a session.

Process: [Main](/docs/glossary#main-process)

    const { netLog } = require('electron')
    
    app.on('ready', function () {
      netLog.startLogging('/path/to/net-log')
      // After some network events
      netLog.stopLogging(path => {
        console.log('Net-logs written to', path)
      })
    })

See [`--log-net-log`](/docs/api/chrome-command-line-switches#--log-net-logpath) to log network events throughout the app's lifecycle.

**Note:** All methods unless specified can only be used after the `ready` event of the `app` module gets emitted.

[Methods](#methods)
-------------------

### [`netLog.startLogging(path)`](#netlogstartloggingpath)

*   `path` String - File path to record network logs.

Starts recording network events to `path`.

### [`netLog.stopLogging([callback])`](#netlogstoploggingcallback)

*   `callback` Function (optional)
    
    *   `path` String - File path to which network logs were recorded.

Stops recording network events. If not called, net logging will automatically end when app quits.

[Properties](#properties)
-------------------------

### [`netLog.currentlyLogging`](#netlogcurrentlylogging)

A `Boolean` property that indicates whether network logs are recorded.

### [`netLog.currentlyLoggingPath`](#netlogcurrentlyloggingpath)

A `String` property that returns the path to the current log file.

* * *

[Notification](#notification)
=============================

> Create OS desktop notifications

Process: [Main](/docs/glossary#main-process)

[Using in the renderer process](#using-in-the-renderer-process)
---------------------------------------------------------------

If you want to show Notifications from a renderer process you should use the [HTML5 Notification API](/docs/tutorial/notifications)

[Class: Notification](#class-notification)
------------------------------------------

> Create OS desktop notifications

Process: [Main](/docs/glossary#main-process)

`Notification` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_events_eventemitter).

It creates a new `Notification` with native properties as set by the `options`.

### [Static Methods](#static-methods)

The `Notification` class has the following static methods:

#### [`Notification.isSupported()`](#notificationissupported)

Returns `Boolean` - Whether or not desktop notifications are supported on the current system

### [`new Notification([options])` _Experimental_](#new-notificationoptions-experimental)

*   `options` Object
    
    *   `title` String - A title for the notification, which will be shown at the top of the notification window when it is shown.
    *   `subtitle` String (optional) _macOS_ - A subtitle for the notification, which will be displayed below the title.
    *   `body` String - The body text of the notification, which will be displayed below the title or subtitle.
    *   `silent` Boolean (optional) - Whether or not to emit an OS notification noise when showing the notification.
    *   `icon` (String | [NativeImage](/docs/api/native-image)) (optional) - An icon to use in the notification.
    *   `hasReply` Boolean (optional) _macOS_ - Whether or not to add an inline reply option to the notification.
    *   `replyPlaceholder` String (optional) _macOS_ - The placeholder to write in the inline reply input field.
    *   `sound` String (optional) _macOS_ - The name of the sound file to play when the notification is shown.
    *   `actions` [NotificationAction\[\]](/docs/api/structures/notification-action) (optional) _macOS_ - Actions to add to the notification. Please read the available actions and limitations in the `NotificationAction` documentation.
    *   `closeButtonText` String (optional) _macOS_ - A custom title for the close button of an alert. An empty string will cause the default localized text to be used.

### [Instance Events](#instance-events)

Objects created with `new Notification` emit the following events:

**Note:** Some events are only available on specific operating systems and are labeled as such.

#### [Event: 'show'](#event-show)

Returns:

*   `event` Event

Emitted when the notification is shown to the user, note this could be fired multiple times as a notification can be shown multiple times through the `show()` method.

#### [Event: 'click'](#event-click)

Returns:

*   `event` Event

Emitted when the notification is clicked by the user.

#### [Event: 'close'](#event-close)

Returns:

*   `event` Event

Emitted when the notification is closed by manual intervention from the user.

This event is not guaranteed to be emitted in all cases where the notification is closed.

#### [Event: 'reply' _macOS_](#event-reply-macos)

Returns:

*   `event` Event
*   `reply` String - The string the user entered into the inline reply field.

Emitted when the user clicks the "Reply" button on a notification with `hasReply: true`.

#### [Event: 'action' _macOS_](#event-action-macos)

Returns:

*   `event` Event
*   `index` Number - The index of the action that was activated.

### [Instance Methods](#instance-methods)

Objects created with `new Notification` have the following instance methods:

#### [`notification.show()`](#notificationshow)

Immediately shows the notification to the user, please note this means unlike the HTML5 Notification implementation, instantiating a `new Notification` does not immediately show it to the user, you need to call this method before the OS will display it.

If the notification has been shown before, this method will dismiss the previously shown notification and create a new one with identical properties.

#### [`notification.close()`](#notificationclose)

Dismisses the notification.

### [Playing Sounds](#playing-sounds)

On macOS, you can specify the name of the sound you'd like to play when the notification is shown. Any of the default sounds (under System Preferences > Sound) can be used, in addition to custom sound files. Be sure that the sound file is copied under the app bundle (e.g., `YourApp.app/Contents/Resources`), or one of the following locations:

*   `~/Library/Sounds`
*   `/Library/Sounds`
*   `/Network/Library/Sounds`
*   `/System/Library/Sounds`

See the [`NSSound`](https://developer.apple.com/documentation/appkit/nssound) docs for more information.

* * *

[NotificationAction Object](#notificationaction-object)
=======================================================

*   `type` String - The type of action, can be `button`.
*   `text` String (optional) - The label for the given action.

[Platform / Action Support](#platform--action-support)
------------------------------------------------------

Action Type

Platform Support

Usage of `text`

Default `text`

Limitations

`button`

macOS

Used as the label for the button

"Show" (or a localized string by system default if first of such `button` , otherwise empty)

Only the first one is used. If multiple are provided, those beyond the first will be listed as additional actions (displayed when mouse active over the action button). Any such action also is incompatible with `hasReply` and will be ignored if `hasReply` is `true` .

### [Button support on macOS](#button-support-on-macos)

In order for extra notification buttons to work on macOS your app must meet the following criteria.

*   App is signed
*   App has it's `NSUserNotificationAlertStyle` set to `alert` in the `Info.plist`.

If either of these requirements are not met the button won't appear.

* * *

[Notifications (Windows, Linux, macOS)](#notifications-windows-linux-macos)
===========================================================================

All three operating systems provide means for applications to send notifications to the user. Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

**Note:** Since this is an HTML5 API it is only available in the renderer process. If you want to show Notifications in the main process please check out the [Notification](/docs/api/notification) module.

    let myNotification = new Notification('Title', {
      body: 'Lorem Ipsum Dolor Sit Amet'
    })
    
    myNotification.onclick = () => {
      console.log('Notification clicked')
    }

While code and user experience across operating systems are similar, there are subtle differences.

[Windows](#windows)
-------------------

*   On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navigate to the file in Explorer, right-click and 'Pin to Start Menu'. You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
*   On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. Note, however, that it does not need to be pinned to the Start screen.
*   On Windows 7, notifications work via a custom implementation which visually resembles the native one on newer systems.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`](/docs/api/app#appsetappusermodelidid-windows) yourself.

Furthermore, in Windows 8, the maximum length for the notification body is 250 characters, with the Windows team recommending that notifications should be kept to 200 characters. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Attempting to send gigantic amounts of text to the API (thousands of characters) might result in instability.

### [Advanced Notifications](#advanced-notifications)

Later versions of Windows allow for advanced notifications, with custom templates, images, and other flexible elements. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### [Quiet Hours / Presentation Mode](#quiet-hours--presentation-mode)

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

[macOS](#macos)
---------------

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

### [Advanced Notifications](#advanced-notifications)

Later versions of macOS allow for notifications with an input field, allowing the user to quickly reply to a notification. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### [Do not disturb / Session State](#do-not-disturb--session-state)

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

[Linux](#linux)
---------------

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.

* * *

[Offscreen Rendering](#offscreen-rendering)
===========================================

Offscreen rendering lets you obtain the content of a browser window in a bitmap, so it can be rendered anywhere, for example on a texture in a 3D scene. The offscreen rendering in Electron uses a similar approach than the [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) project.

Two modes of rendering can be used and only the dirty area is passed in the `'paint'` event to be more efficient. The rendering can be stopped, continued and the frame rate can be set. The specified frame rate is a top limit value, when there is nothing happening on a webpage, no frames are generated. The maximum frame rate is 60, because above that there is no benefit, only performance loss.

**Note:** An offscreen window is always created as a [Frameless Window](/docs/api/frameless-window).

[Rendering Modes](#rendering-modes)
-----------------------------------

### [GPU accelerated](#gpu-accelerated)

GPU accelerated rendering means that the GPU is used for composition. Because of that the frame has to be copied from the GPU which requires more performance, thus this mode is quite a bit slower than the other one. The benefit of this mode that WebGL and 3D CSS animations are supported.

### [Software output device](#software-output-device)

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster, thus this mode is preferred over the GPU accelerated one.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`](/docs/api/app#appdisablehardwareacceleration) API.

[Usage](#usage)
---------------

    const { app, BrowserWindow } = require('electron')
    
    app.disableHardwareAcceleration()
    
    let win
    
    app.once('ready', () => {
      win = new BrowserWindow({
        webPreferences: {
          offscreen: true
        }
      })
    
      win.loadURL('http://github.com')
      win.webContents.on('paint', (event, dirty, image) => {
        // updateBitmap(dirty, image.getBitmap())
      })
      win.webContents.setFrameRate(30)
    })

* * *

[Online/Offline Event Detection](#onlineoffline-event-detection)
================================================================

[Online and offline event](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) detection can be implemented in the renderer process using the [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) attribute, part of standard HTML5 API. The `navigator.onLine` attribute returns `false` if any network requests are guaranteed to fail i.e. definitely offline (disconnected from the network). It returns `true` in all other cases. Since all other conditions return `true`, one has to be mindful of getting false positives, as we cannot assume `true` value necessarily means that Electron can access the internet. Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

Example:

_main.js_

    const { app, BrowserWindow } = require('electron')
    
    let onlineStatusWindow
    
    app.on('ready', () => {
      onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
      onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
    })

_online-status.html_

    <!DOCTYPE html>
    <html>
    <body>
    <script>
      const alertOnlineStatus = () => {
        window.alert(navigator.onLine ? 'online' : 'offline')
      }
    
      window.addEventListener('online',  alertOnlineStatus)
      window.addEventListener('offline',  alertOnlineStatus)
    
      alertOnlineStatus()
    </script>
    </body>
    </html>

There may be instances where you want to respond to these events in the main process as well. The main process however does not have a `navigator` object and thus cannot detect these events directly. Using Electron's inter-process communication utilities, the events can be forwarded to the main process and handled as needed, as shown in the following example.

_main.js_

    const { app, BrowserWindow, ipcMain } = require('electron')
    let onlineStatusWindow
    
    app.on('ready', () => {
      onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
      onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
    })
    
    ipcMain.on('online-status-changed', (event, status) => {
      console.log(status)
    })

_online-status.html_

    <!DOCTYPE html>
    <html>
    <body>
    <script>
      const { ipcRenderer } = require('electron')
      const updateOnlineStatus = () => {
        ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
      }
    
      window.addEventListener('online',  updateOnlineStatus)
      window.addEventListener('offline',  updateOnlineStatus)
    
      updateOnlineStatus()
    </script>
    </body>
    </html>

* * *

[Point Object](#point-object)
=============================

*   `x` Number
*   `y` Number

**Note:** Both `x` and `y` must be whole integers, when providing a point object as input to an Electron API we will automatically round your `x` and `y` values to the nearest whole integer.

* * *

[powerMonitor](#powermonitor)
=============================

> Monitor power state changes.

Process: [Main](/docs/glossary#main-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

For example:

    const electron = require('electron')
    const { app } = electron
    
    app.on('ready', () => {
      electron.powerMonitor.on('suspend', () => {
        console.log('The system is going to sleep')
      })
    })

[Events](#events)
-----------------

The `powerMonitor` module emits the following events:

### [Event: 'suspend'](#event-suspend)

Emitted when the system is suspending.

### [Event: 'resume'](#event-resume)

Emitted when system is resuming.

### [Event: 'on-ac' _Windows_](#event-on-ac-windows)

Emitted when the system changes to AC power.

### [Event: 'on-battery' _Windows_](#event-on-battery-windows)

Emitted when system changes to battery power.

### [Event: 'shutdown' _Linux_ _macOS_](#event-shutdown-linux-macos)

Emitted when the system is about to reboot or shut down. If the event handler invokes `e.preventDefault()`, Electron will attempt to delay system shutdown in order for the app to exit cleanly. If `e.preventDefault()` is called, the app should exit as soon as possible by calling something like `app.quit()`.

### [Event: 'lock-screen' _macOS_ _Windows_](#event-lock-screen-macos-windows)

Emitted when the system is about to lock the screen.

### [Event: 'unlock-screen' _macOS_ _Windows_](#event-unlock-screen-macos-windows)

Emitted as soon as the systems screen is unlocked.

[Methods](#methods)
-------------------

The `powerMonitor` module has the following methods:

#### [`powerMonitor.querySystemIdleState(idleThreshold, callback)`](#powermonitorquerysystemidlestateidlethreshold-callback)

*   `idleThreshold` Integer
*   `callback` Function
    
    *   `idleState` String - Can be `active`, `idle`, `locked` or `unknown`

Calculate the system idle state. `idleThreshold` is the amount of time (in seconds) before considered idle. `callback` will be called synchronously on some systems and with an `idleState` argument that describes the system's state. `locked` is available on supported systems only.

#### [`powerMonitor.querySystemIdleTime(callback)`](#powermonitorquerysystemidletimecallback)

*   `callback` Function
    
    *   `idleTime` Integer - Idle time in seconds

Calculate system idle time in seconds.

* * *

[powerSaveBlocker](#powersaveblocker)
=====================================

> Block the system from entering low-power (sleep) mode.

Process: [Main](/docs/glossary#main-process)

For example:

    const { powerSaveBlocker } = require('electron')
    
    const id = powerSaveBlocker.start('prevent-display-sleep')
    console.log(powerSaveBlocker.isStarted(id))
    
    powerSaveBlocker.stop(id)

[Methods](#methods)
-------------------

The `powerSaveBlocker` module has the following methods:

### [`powerSaveBlocker.start(type)`](#powersaveblockerstarttype)

*   `type` String - Power save blocker type.
    
    *   `prevent-app-suspension` - Prevent the application from being suspended. Keeps system active but allows screen to be turned off. Example use cases: downloading a file or playing audio.
    *   `prevent-display-sleep` - Prevent the display from going to sleep. Keeps system and screen active. Example use case: playing video.

Returns `Integer` - The blocker ID that is assigned to this power blocker.

Starts preventing the system from entering lower-power mode. Returns an integer identifying the power save blocker.

**Note:** `prevent-display-sleep` has higher precedence over `prevent-app-suspension`. Only the highest precedence type takes effect. In other words, `prevent-display-sleep` always takes precedence over `prevent-app-suspension`.

For example, an API calling A requests for `prevent-app-suspension`, and another calling B requests for `prevent-display-sleep`. `prevent-display-sleep` will be used until B stops its request. After that, `prevent-app-suspension` is used.

### [`powerSaveBlocker.stop(id)`](#powersaveblockerstopid)

*   `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Stops the specified power save blocker.

### [`powerSaveBlocker.isStarted(id)`](#powersaveblockerisstartedid)

*   `id` Integer - The power save blocker id returned by `powerSaveBlocker.start`.

Returns `Boolean` - Whether the corresponding `powerSaveBlocker` has started.

* * *

[PrinterInfo Object](#printerinfo-object)
=========================================

*   `name` String
*   `description` String
*   `status` Number
*   `isDefault` Boolean

[Example](#example)
-------------------

Below is an example of some of the additional options that may be set which may be different on each platform.

    {
      name: 'Zebra_LP2844',
      description: 'Zebra LP2844',
      status: 3,
      isDefault: false,
      options: {
        copies: '1',
        'device-uri': 'usb://Zebra/LP2844?location=14200000',
        finishings: '3',
        'job-cancel-after': '10800',
        'job-hold-until': 'no-hold',
        'job-priority': '50',
        'job-sheets': 'none,none',
        'marker-change-time': '0',
        'number-up': '1',
        'printer-commands': 'none',
        'printer-info': 'Zebra LP2844',
        'printer-is-accepting-jobs': 'true',
        'printer-is-shared': 'true',
        'printer-location': '',
        'printer-make-and-model': 'Zebra EPL2 Label Printer',
        'printer-state': '3',
        'printer-state-change-time': '1484872644',
        'printer-state-reasons': 'offline-report',
        'printer-type': '36932',
        'printer-uri-supported': 'ipp://localhost/printers/Zebra_LP2844',
        system_driverinfo: 'Z'
      }
    }

* * *

[process](#process)
===================

> Extensions to process object.

Process: [Main](/docs/glossary#main-process), [Renderer](/docs/glossary#renderer-process)

Electron's `process` object is extended from the [Node.js `process` object](https://nodejs.org/api/process.html). It adds the following events, properties, and methods:

[Sandbox](#sandbox)
-------------------

In sandboxed renderers the `process` object contains only a subset of the APIs:

*   `crash()`
*   `hang()`
*   `getHeapStatistics()`
*   `getProcessMemoryInfo()`
*   `getSystemMemoryInfo()`
*   `getCPUUsage()`
*   `getIOCounters()`
*   `argv`
*   `execPath`
*   `env`
*   `pid`
*   `arch`
*   `platform`
*   `resourcesPath`
*   `sandboxed`
*   `type`
*   `version`
*   `versions`
*   `mas`
*   `windowsStore`

[Events](#events)
-----------------

### [Event: 'loaded'](#event-loaded)

Emitted when Electron has loaded its internal initialization script and is beginning to load the web page or the main script.

It can be used by the preload script to add removed Node global symbols back to the global scope when node integration is turned off:

    // preload.js
    const _setImmediate = setImmediate
    const _clearImmediate = clearImmediate
    process.once('loaded', () => {
      global.setImmediate = _setImmediate
      global.clearImmediate = _clearImmediate
    })

[Properties](#properties)
-------------------------

### [`process.defaultApp`](#processdefaultapp)

A `Boolean`. When app is started by being passed as parameter to the default app, this property is `true` in the main process, otherwise it is `undefined`.

### [`process.mas`](#processmas)

A `Boolean`. For Mac App Store build, this property is `true`, for other builds it is `undefined`.

### [`process.noAsar`](#processnoasar)

A `Boolean` that controls ASAR support inside your application. Setting this to `true` will disable the support for `asar` archives in Node's built-in modules.

### [`process.noDeprecation`](#processnodeprecation)

A `Boolean` that controls whether or not deprecation warnings are printed to `stderr`. Setting this to `true` will silence deprecation warnings. This property is used instead of the `--no-deprecation` command line flag.

### [`process.resourcesPath`](#processresourcespath)

A `String` representing the path to the resources directory.

### [`process.sandboxed`](#processsandboxed)

A `Boolean`. When the renderer process is sandboxed, this property is `true`, otherwise it is `undefined`.

### [`process.throwDeprecation`](#processthrowdeprecation)

A `Boolean` that controls whether or not deprecation warnings will be thrown as exceptions. Setting this to `true` will throw errors for deprecations. This property is used instead of the `--throw-deprecation` command line flag.

### [`process.traceDeprecation`](#processtracedeprecation)

A `Boolean` that controls whether or not deprecations printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for deprecations. This property is instead of the `--trace-deprecation` command line flag.

### [`process.traceProcessWarnings`](#processtraceprocesswarnings)

A `Boolean` that controls whether or not process warnings printed to `stderr` include their stack trace. Setting this to `true` will print stack traces for process warnings (including deprecations). This property is instead of the `--trace-warnings` command line flag.

### [`process.type`](#processtype)

A `String` representing the current process's type, can be `"browser"` (i.e. main process) or `"renderer"`.

### [`process.versions.chrome`](#processversionschrome)

A `String` representing Chrome's version string.

### [`process.versions.electron`](#processversionselectron)

A `String` representing Electron's version string.

### [`process.windowsStore`](#processwindowsstore)

A `Boolean`. If the app is running as a Windows Store app (appx), this property is `true`, for otherwise it is `undefined`.

[Methods](#methods)
-------------------

The `process` object has the following methods:

### [`process.crash()`](#processcrash)

Causes the main thread of the current process crash.

### [`process.getCreationTime()`](#processgetcreationtime)

Returns `Number | null` - The number of milliseconds since epoch, or `null` if the information is unavailable

Indicates the creation time of the application. The time is represented as number of milliseconds since epoch. It returns null if it is unable to get the process creation time.

### [`process.getCPUUsage()`](#processgetcpuusage)

Returns [`CPUUsage`](/docs/api/structures/cpu-usage)

### [`process.getIOCounters()` _Windows_ _Linux_](#processgetiocounters-windows-linux)

Returns [`IOCounters`](/docs/api/structures/io-counters)

### [`process.getHeapStatistics()`](#processgetheapstatistics)

Returns `Object`:

*   `totalHeapSize` Integer
*   `totalHeapSizeExecutable` Integer
*   `totalPhysicalSize` Integer
*   `totalAvailableSize` Integer
*   `usedHeapSize` Integer
*   `heapSizeLimit` Integer
*   `mallocedMemory` Integer
*   `peakMallocedMemory` Integer
*   `doesZapGarbage` Boolean

Returns an object with V8 heap statistics. Note that all statistics are reported in Kilobytes.

### [`process.getProcessMemoryInfo()`](#processgetprocessmemoryinfo)

Returns `Object`:

*   `residentSet` Integer _Linux_ and _Windows_ - The amount of memory currently pinned to actual physical RAM in Kilobytes.
*   `private` Integer - The amount of memory not shared by other processes, such as JS heap or HTML content in Kilobytes.
*   `shared` Integer - The amount of memory shared between processes, typically memory consumed by the Electron code itself in Kilobytes.

Returns an object giving memory usage statistics about the current process. Note that all statistics are reported in Kilobytes. This api should be called after app ready.

Chromium does not provide `residentSet` value for macOS. This is because macOS performs in-memory compression of pages that haven't been recently used. As a result the resident set size value is not what one would expect. `private` memory is more representative of the actual pre-compression memory usage of the process on macOS.

### [`process.getSystemMemoryInfo()`](#processgetsystemmemoryinfo)

Returns `Object`:

*   `total` Integer - The total amount of physical memory in Kilobytes available to the system.
*   `free` Integer - The total amount of memory not being used by applications or disk cache.
*   `swapTotal` Integer _Windows_ _Linux_ - The total amount of swap memory in Kilobytes available to the system.
*   `swapFree` Integer _Windows_ _Linux_ - The free amount of swap memory in Kilobytes available to the system.

Returns an object giving memory usage statistics about the entire system. Note that all statistics are reported in Kilobytes.

### [`process.takeHeapSnapshot(filePath)`](#processtakeheapsnapshotfilepath)

*   `filePath` String - Path to the output file.

Returns `Boolean` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

### [`process.hang()`](#processhang)

Causes the main thread of the current process hang.

### [`process.setFdLimit(maxDescriptors)` _macOS_ _Linux_](#processsetfdlimitmaxdescriptors-macos-linux)

*   `maxDescriptors` Integer

Sets the file descriptor soft limit to `maxDescriptors` or the OS hard limit, whichever is lower for the current process.

* * *

[ProcessMetric Object](#processmetric-object)
=============================================

*   `pid` Integer - Process id of the process.
*   `type` String - Process type (Browser or Tab or GPU etc).
*   `cpu` [CPUUsage](/docs/api/structures/cpu-usage) - CPU usage of the process.

* * *

[Product Object](#product-object)
=================================

*   `productIdentifier` String - The string that identifies the product to the Apple App Store.
*   `localizedDescription` String - A description of the product.
*   `localizedTitle` String - The name of the product.
*   `contentVersion` String - A string that identifies the version of the content.
*   `contentLengths` Number\[\] - The total size of the content, in bytes.
*   `price` Number - The cost of the product in the local currency.
*   `formattedPrice` String - The locale formatted price of the product.
*   `downloadable` Boolean - A Boolean value that indicates whether the App Store has downloadable content for this product.

* * *

[Progress Bar in Taskbar (Windows, macOS, Unity)](#progress-bar-in-taskbar-windows-macos-unity)
===============================================================================================

On Windows a taskbar button can be used to display a progress bar. This enables a window to provide progress information to the user without the user having to switch to the window itself.

On macOS the progress bar will be displayed as a part of the dock icon.

The Unity DE also has a similar feature that allows you to specify the progress bar in the launcher.

**Progress bar in taskbar button:**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

All three cases are covered by the same API - the `setProgressBar()` method available on instances of `BrowserWindows`. Call it with a number between `0` and `1` to indicate your progress. If you have a long-running task that's currently at 63% towards completion, you'd call it with `setProgressBar(0.63)`.

Generally speaking, setting the parameter to a value below zero (like `-1`) will remove the progress bar while setting it to a value higher than one (like `2`) will switch the progress bar to intermediate mode.

See the [API documentation for more options and modes](/docs/api/browser-window#winsetprogressbarprogress).

    const { BrowserWindow } = require('electron')
    const win = new BrowserWindow()
    
    win.setProgressBar(0.5)

* * *

[protocol](#protocol)
=====================

> Register a custom protocol and intercept existing protocol requests.

Process: [Main](/docs/glossary#main-process)

An example of implementing a protocol that has the same effect as the `file://` protocol:

    const { app, protocol } = require('electron')
    const path = require('path')
    
    app.on('ready', () => {
      protocol.registerFileProtocol('atom', (request, callback) => {
        const url = request.url.substr(7)
        callback({ path: path.normalize(`${__dirname}/${url}`) })
      }, (error) => {
        if (error) console.error('Failed to register protocol')
      })
    })

**Note:** All methods unless specified can only be used after the `ready` event of the `app` module gets emitted.

[Methods](#methods)
-------------------

The `protocol` module has the following methods:

### [`protocol.registerStandardSchemes(schemes[, options])`](#protocolregisterstandardschemesschemes-options)

*   `schemes` String\[\] - Custom schemes to be registered as standard schemes.
*   `options` Object (optional)
    
    *   `secure` Boolean (optional) - `true` to register the scheme as secure. Default `false`.

A standard scheme adheres to what RFC 3986 calls [generic URI syntax](https://tools.ietf.org/html/rfc3986#section-3). For example `http` and `https` are standard schemes, while `file` is not.

Registering a scheme as standard, will allow relative and absolute resources to be resolved correctly when served. Otherwise the scheme will behave like the `file` protocol, but without the ability to resolve relative URLs.

For example when you load following page with custom protocol without registering it as standard scheme, the image will not be loaded because non-standard schemes can not recognize relative URLs:

    <body>
      <img src='test.png'>
    </body>

Registering a scheme as standard will allow access to files through the [FileSystem API](https://developer.mozilla.org/en-US/docs/Web/API/LocalFileSystem). Otherwise the renderer will throw a security error for the scheme.

By default web storage apis (localStorage, sessionStorage, webSQL, indexedDB, cookies) are disabled for non standard schemes. So in general if you want to register a custom protocol to replace the `http` protocol, you have to register it as a standard scheme:

    const { app, protocol } = require('electron')
    
    protocol.registerStandardSchemes(['atom'])
    app.on('ready', () => {
      protocol.registerHttpProtocol('atom', '...')
    })

**Note:** This method can only be used before the `ready` event of the `app` module gets emitted.

### [`protocol.registerServiceWorkerSchemes(schemes)`](#protocolregisterserviceworkerschemesschemes)

*   `schemes` String\[\] - Custom schemes to be registered to handle service workers.

### [`protocol.registerFileProtocol(scheme, handler[, completion])`](#protocolregisterfileprotocolscheme-handler-completion)

*   `scheme` String
*   `handler` Function
    
    *   `request` Object
        
        *   `url` String
        *   `referrer` String
        *   `method` String
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `filePath` String (optional)
*   `completion` Function (optional)
    
    *   `error` Error

Registers a protocol of `scheme` that will send the file as a response. The `handler` will be called with `handler(request, callback)` when a `request` is going to be created with `scheme`. `completion` will be called with `completion(null)` when `scheme` is successfully registered or `completion(error)` when failed.

To handle the `request`, the `callback` should be called with either the file's path or an object that has a `path` property, e.g. `callback(filePath)` or `callback({ path: filePath })`.

When `callback` is called with nothing, a number, or an object that has an `error` property, the `request` will fail with the `error` number you specified. For the available error numbers you can use, please see the [net error list](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

By default the `scheme` is treated like `http:`, which is parsed differently than protocols that follow the "generic URI syntax" like `file:`, so you probably want to call `protocol.registerStandardSchemes` to have your scheme treated as a standard scheme.

### [`protocol.registerBufferProtocol(scheme, handler[, completion])`](#protocolregisterbufferprotocolscheme-handler-completion)

*   `scheme` String
*   `handler` Function
    
    *   `request` Object
        
        *   `url` String
        *   `referrer` String
        *   `method` String
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `buffer` (Buffer | [MimeTypedBuffer](/docs/api/structures/mime-typed-buffer)) (optional)
*   `completion` Function (optional)
    
    *   `error` Error

Registers a protocol of `scheme` that will send a `Buffer` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `Buffer` object or an object that has the `data`, `mimeType`, and `charset` properties.

Example:

    const { protocol } = require('electron')
    
    protocol.registerBufferProtocol('atom', (request, callback) => {
      callback({ mimeType: 'text/html', data: Buffer.from('<h5>Response</h5>') })
    }, (error) => {
      if (error) console.error('Failed to register protocol')
    })

### [`protocol.registerStringProtocol(scheme, handler[, completion])`](#protocolregisterstringprotocolscheme-handler-completion)

*   `scheme` String
*   `handler` Function
    
    *   `request` Object
        
        *   `url` String
        *   `referrer` String
        *   `method` String
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `data` String (optional)
*   `completion` Function (optional)
    
    *   `error` Error

Registers a protocol of `scheme` that will send a `String` as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with either a `String` or an object that has the `data`, `mimeType`, and `charset` properties.

### [`protocol.registerHttpProtocol(scheme, handler[, completion])`](#protocolregisterhttpprotocolscheme-handler-completion)

*   `scheme` String
*   `handler` Function
    
    *   `request` Object
        
        *   `url` String
        *   `headers` Object
        *   `referrer` String
        *   `method` String
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `redirectRequest` Object
            
            *   `url` String
            *   `method` String
            *   `session` Object (optional)
            *   `uploadData` Object (optional)
                
                *   `contentType` String - MIME type of the content.
                *   `data` String - Content to be sent.
*   `completion` Function (optional)
    
    *   `error` Error

Registers a protocol of `scheme` that will send an HTTP request as a response.

The usage is the same with `registerFileProtocol`, except that the `callback` should be called with a `redirectRequest` object that has the `url`, `method`, `referrer`, `uploadData` and `session` properties.

By default the HTTP request will reuse the current session. If you want the request to have a different session you should set `session` to `null`.

For POST requests the `uploadData` object must be provided.

### [`protocol.registerStreamProtocol(scheme, handler[, completion])`](#protocolregisterstreamprotocolscheme-handler-completion)

*   `scheme` String
*   `handler` Function
    
    *   `request` Object
        
        *   `url` String
        *   `headers` Object
        *   `referrer` String
        *   `method` String
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `stream` (ReadableStream | [StreamProtocolResponse](/docs/api/structures/stream-protocol-response)) (optional)
*   `completion` Function (optional)
    
    *   `error` Error

Registers a protocol of `scheme` that will send a `Readable` as a response.

The usage is similar to the other `register{Any}Protocol`, except that the `callback` should be called with either a `Readable` object or an object that has the `data`, `statusCode`, and `headers` properties.

Example:

    const { protocol } = require('electron')
    const { PassThrough } = require('stream')
    
    function createStream (text) {
      const rv = new PassThrough() // PassThrough is also a Readable stream
      rv.push(text)
      rv.push(null)
      return rv
    }
    
    protocol.registerStreamProtocol('atom', (request, callback) => {
      callback({
        statusCode: 200,
        headers: {
          'content-type': 'text/html'
        },
        data: createStream('<h5>Response</h5>')
      })
    }, (error) => {
      if (error) console.error('Failed to register protocol')
    })

It is possible to pass any object that implements the readable stream API (emits `data`/`end`/`error` events). For example, here's how a file could be returned:

    const { protocol } = require('electron')
    const fs = require('fs')
    
    protocol.registerStreamProtocol('atom', (request, callback) => {
      callback(fs.createReadStream('index.html'))
    }, (error) => {
      if (error) console.error('Failed to register protocol')
    })

### [`protocol.unregisterProtocol(scheme[, completion])`](#protocolunregisterprotocolscheme-completion)

*   `scheme` String
*   `completion` Function (optional)
    
    *   `error` Error

Unregisters the custom protocol of `scheme`.

### [`protocol.isProtocolHandled(scheme, callback)`](#protocolisprotocolhandledscheme-callback)

*   `scheme` String
*   `callback` Function
    
    *   `error` Error

The `callback` will be called with a boolean that indicates whether there is already a handler for `scheme`.

### [`protocol.interceptFileProtocol(scheme, handler[, completion])`](#protocolinterceptfileprotocolscheme-handler-completion)

*   `scheme` String
*   `handler` Function
    
    *   `request` Object
        
        *   `url` String
        *   `referrer` String
        *   `method` String
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `filePath` String
*   `completion` Function (optional)
    
    *   `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a file as a response.

### [`protocol.interceptStringProtocol(scheme, handler[, completion])`](#protocolinterceptstringprotocolscheme-handler-completion)

*   `scheme` String
*   `handler` Function
    
    *   `request` Object
        
        *   `url` String
        *   `referrer` String
        *   `method` String
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `data` String (optional)
*   `completion` Function (optional)
    
    *   `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `String` as a response.

### [`protocol.interceptBufferProtocol(scheme, handler[, completion])`](#protocolinterceptbufferprotocolscheme-handler-completion)

*   `scheme` String
*   `handler` Function
    
    *   `request` Object
        
        *   `url` String
        *   `referrer` String
        *   `method` String
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `buffer` Buffer (optional)
*   `completion` Function (optional)
    
    *   `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a `Buffer` as a response.

### [`protocol.interceptHttpProtocol(scheme, handler[, completion])`](#protocolintercepthttpprotocolscheme-handler-completion)

*   `scheme` String
*   `handler` Function
    
    *   `request` Object
        
        *   `url` String
        *   `headers` Object
        *   `referrer` String
        *   `method` String
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `redirectRequest` Object
            
            *   `url` String
            *   `method` String
            *   `session` Object (optional)
            *   `uploadData` Object (optional)
                
                *   `contentType` String - MIME type of the content.
                *   `data` String - Content to be sent.
*   `completion` Function (optional)
    
    *   `error` Error

Intercepts `scheme` protocol and uses `handler` as the protocol's new handler which sends a new HTTP request as a response.

### [`protocol.interceptStreamProtocol(scheme, handler[, completion])`](#protocolinterceptstreamprotocolscheme-handler-completion)

*   `scheme` String
*   `handler` Function
    
    *   `request` Object
        
        *   `url` String
        *   `headers` Object
        *   `referrer` String
        *   `method` String
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `stream` (ReadableStream | [StreamProtocolResponse](/docs/api/structures/stream-protocol-response)) (optional)
*   `completion` Function (optional)
    
    *   `error` Error

Same as `protocol.registerStreamProtocol`, except that it replaces an existing protocol handler.

### [`protocol.uninterceptProtocol(scheme[, completion])`](#protocoluninterceptprotocolscheme-completion)

*   `scheme` String
*   `completion` Function (optional)
    
    *   `error` Error

Remove the interceptor installed for `scheme` and restore its original handler.

* * *

[Pull Requests](#pull-requests)
===============================

*   [Setting up your local environment](#setting-up-your-local-environment)
    
    *   [Step 1: Fork](#step-1-fork)
    *   [Step 2: Build](#step-2-build)
    *   [Step 3: Branch](#step-3-branch)
*   [Making Changes](#making-changes)
    
    *   [Step 4: Code](#step-4-code)
    *   [Step 5: Commit](#step-5-commit)
        
        *   [Commit message guidelines](#commit-message-guidelines)
    *   [Step 6: Rebase](#step-6-rebase)
    *   [Step 7: Test](#step-7-test)
    *   [Step 8: Push](#step-8-push)
    *   [Step 9: Opening the Pull Request](#step-9-opening-the-pull-request)
    *   [Step 10: Discuss and Update](#step-10-discuss-and-update)
        
        *   [Approval and Request Changes Workflow](#approval-and-request-changes-workflow)
    *   [Step 11: Landing](#step-11-landing)
    *   [Continuous Integration Testing](#continuous-integration-testing)

[Setting up your local environment](#setting-up-your-local-environment)
-----------------------------------------------------------------------

### [Step 1: Fork](#step-1-fork)

Fork the project [on GitHub](https://github.com/electron/electron) and clone your fork locally.

    $ git clone git@github.com:username/electron.git
    $ cd electron
    $ git remote add upstream https://github.com/electron/electron.git
    $ git fetch upstream

### [Step 2: Build](#step-2-build)

Build steps and dependencies differ slightly depending on your operating system. See these detailed guides on building Electron locally:

*   [Building on MacOS](https://electronjs.org/docs/development/build-instructions-macos)
*   [Building on Linux](https://electronjs.org/docs/development/build-instructions-linux)
*   [Building on Windows](https://electronjs.org/docs/development/build-instructions-windows)

Once you've built the project locally, you're ready to start making changes!

### [Step 3: Branch](#step-3-branch)

To keep your development environment organized, create local branches to hold your work. These should be branched directly off of the `master` branch.

    $ git checkout -b my-branch -t upstream/master

[Making Changes](#making-changes)
---------------------------------

### [Step 4: Code](#step-4-code)

Most pull requests opened against the `electron/electron` repository include changes to either the C/C++ code in the `atom/` folder, the JavaScript code in the `lib/` folder, the documentation in `docs/api/` or tests in the `spec/` folder.

Please be sure to run `npm run lint` from time to time on any code changes to ensure that they follow the project's code style.

See [coding style](https://electronjs.org/docs/development/coding-style) for more information about best practice when modifying code in different parts of the project.

### [Step 5: Commit](#step-5-commit)

It is recommended to keep your changes grouped logically within individual commits. Many contributors find it easier to review changes that are split across multiple commits. There is no limit to the number of commits in a pull request.

    $ git add my/changed/files
    $ git commit

Note that multiple commits often get squashed when they are landed.

#### [Commit message guidelines](#commit-message-guidelines)

A good commit message should describe what changed and why. The Electron project uses [semantic commit messages](https://conventionalcommits.org/) to streamline the release process.

Before a pull request can be merged, it **must** have a pull request title with a semantic prefix.

Examples of commit messages with semantic prefixes:

*   `fix: don't overwrite prevent_default if default wasn't prevented`
*   `feat: add app.isPackaged() method`
*   `docs: app.isDefaultProtocolClient is now available on Linux`

Common prefixes:

*   fix: A bug fix
*   feat: A new feature
*   docs: Documentation changes
*   test: Adding missing tests or correcting existing tests
*   build: Changes that affect the build system
*   ci: Changes to our CI configuration files and scripts
*   perf: A code change that improves performance
*   refactor: A code change that neither fixes a bug nor adds a feature
*   style: Changes that do not affect the meaning of the code (linting)
*   vendor: Bumping a dependency like libchromiumcontent or node

Other things to keep in mind when writing a commit message:

1.  The first line should:
    
    *   contain a short description of the change (preferably 50 characters or less, and no more than 72 characters)
    *   be entirely in lowercase with the exception of proper nouns, acronyms, and the words that refer to code, like function/variable names
2.  Keep the second line blank.
3.  Wrap all other lines at 72 columns.

#### [Breaking Changes](#breaking-changes)

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with Major in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

### [Step 6: Rebase](#step-6-rebase)

Once you have committed your changes, it is a good idea to use `git rebase` (not `git merge`) to synchronize your work with the main repository.

    $ git fetch upstream
    $ git rebase upstream/master

This ensures that your working branch has the latest changes from `electron/electron` master.

### [Step 7: Test](#step-7-test)

Bug fixes and features should always come with tests. A [testing guide](https://electronjs.org/docs/development/testing) has been provided to make the process easier. Looking at other tests to see how they should be structured can also help.

Before submitting your changes in a pull request, always run the full test suite. To run the tests:

    $ npm run test

Make sure the linter does not report any issues and that all tests pass. Please do not submit patches that fail either check.

If you are updating tests and want to run a single spec to check it:

    $ npm run test -match=menu

The above would only run spec modules matching `menu`, which is useful for anyone who's working on tests that would otherwise be at the very end of the testing cycle.

### [Step 8: Push](#step-8-push)

Once your commits are ready to go -- with passing tests and linting -- begin the process of opening a pull request by pushing your working branch to your fork on GitHub.

    $ git push origin my-branch

### [Step 9: Opening the Pull Request](#step-9-opening-the-pull-request)

From within GitHub, opening a new pull request will present you with a template that should be filled out:

    <!--
    Thank you for your pull request. Please provide a description above and review
    the requirements below.
    
    Bug fixes and new features should include tests and possibly benchmarks.
    
    Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
    -->

### [Step 10: Discuss and update](#step-10-discuss-and-update)

You will probably get feedback or requests for changes to your pull request. This is a big part of the submission process so don't be discouraged! Some contributors may sign off on the pull request right away. Others may have detailed comments or feedback. This is a necessary part of the process in order to evaluate whether the changes are correct and necessary.

To make changes to an existing pull request, make the changes to your local branch, add a new commit with those changes, and push those to your fork. GitHub will automatically update the pull request.

    $ git add my/changed/files
    $ git commit
    $ git push origin my-branch

There are a number of more advanced mechanisms for managing commits using `git rebase` that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the pull request to ping reviewers if you are awaiting an answer on something. If you encounter words or acronyms that seem unfamiliar, refer to this [glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### [Approval and Request Changes Workflow](#approval-and-request-changes-workflow)

All pull requests require approval from a [Code Owner](https://github.com/orgs/electron/teams/code-owners) of the area you modified in order to land. Whenever a maintainer reviews a pull request they may request changes. These may be small, such as fixing a typo, or may involve substantive changes. Such requests are intended to be helpful, but at times may come across as abrupt or unhelpful, especially if they do not include concrete suggestions on _how_ to change them.

Try not to be discouraged. If you feel that a review is unfair, say so or seek the input of another project contributor. Often such comments are the result of a reviewer having taken insufficient time to review and are not ill-intended. Such difficulties can often be resolved with a bit of patience. That said, reviewers should be expected to provide helpful feeback.

### [Step 11: Landing](#step-11-landing)

In order to land, a pull request needs to be reviewed and approved by at least one Electron Code Owner and pass CI. After that, if there are no objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### [Continuous Integration Testing](#continuous-integration-testing)

Every pull request is tested on the Continuous Integration (CI) system to confirm that it works on Electron's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms. This means that all tests pass and there are no linting errors. However, it is not uncommon for the CI infrastructure itself to fail on specific platforms or for so-called "flaky" tests to fail ("be red"). Each CI failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only [Releasers](https://github.com/orgs/electron/teams/releasers/members) can restart a CI run. If you believe CI is giving a false negative, ask a Releaser to restart the tests.

* * *

[Quick Start](#quick-start)
===========================

Electron enables you to create desktop applications with pure JavaScript by providing a runtime with rich native (operating system) APIs. You could see it as a variant of the Node.js runtime that is focused on desktop applications instead of web servers.

The old "Quick Start" document that used to live here has been split up into two documents:

*   To check out how a simple Electron app is built, see [Writing Your First Electron App](/docs/tutorial/first-app)
*   To check out the process architecture, see [Main and Renderer Processes](/docs/tutorial/application-architecture#main-and-renderer-processes).

To learn more about Electron, check out the [official guides](/docs).

* * *

[Developing Electron](#developing-electron)
===========================================

These guides are intended for people working on the Electron project itself. For guides on Electron app development, see [/docs/README.md](/docs/README#guides-and-tutorials).

*   [Code of Conduct](/CODE_OF_CONDUCT)
*   [Contributing to Electron](/CONTRIBUTING)
*   [Issues](/docs/development/issues)
*   [Pull Requests](/docs/development/pull-requests)
*   [Documentation Styleguide](/docs/development/coding-style#documentation)
*   [Source Code Directory Structure](/docs/development/source-code-directory-structure)
*   [Coding Style](/docs/development/coding-style)
*   [Using clang-format on C++ Code](/docs/development/clang-format)
*   [Build System Overview](/docs/development/build-system-overview)
*   [Build Instructions (macOS)](/docs/development/build-instructions-macos)
*   [Build Instructions (Windows)](/docs/development/build-instructions-windows)
*   [Build Instructions (Linux)](/docs/development/build-instructions-linux)
*   [Chromium Development](/docs/development/chromium-development)
*   [V8 Development](/docs/development/v8-development)
*   [Testing](/docs/development/testing)
*   [Debugging on Windows](/docs/development/debug-instructions-windows)
*   [Debugging on macOS](/docs/development/debugging-instructions-macos)
*   [Setting Up Symbol Server in Debugger](/docs/development/setting-up-symbol-server)
*   [Upgrading Chromium](/docs/development/upgrading-chromium)
*   [Upgrading Crashpad](/docs/development/upgrading-crashpad)
*   [Upgrading Node](/docs/development/upgrading-node)
*   [Releasing](/docs/development/releasing)

* * *

[Official Guides](#official-guides)
===================================

Please make sure that you use the documents that match your Electron version. The version number should be a part of the page URL. If it's not, you are probably using the documentation of a development branch which may contain API changes that are not compatible with your Electron version. To view older versions of the documentation, you can [browse by tag](https://github.com/electron/electron/tree/v1.4.0) on GitHub by opening the "Switch branches/tags" dropdown and selecting the tag that matches your version.

[FAQ](#faq)
-----------

There are questions that are asked quite often. Check this out before creating an issue:

*   [Electron FAQ](/docs/faq)

[Guides and Tutorials](#guides-and-tutorials)
---------------------------------------------

*   [Setting up the Development Environment](/docs/tutorial/development-environment)
    
    *   [Setting up macOS](/docs/tutorial/development-environment#setting-up-macos)
    *   [Setting up Windows](/docs/tutorial/development-environment#setting-up-windows)
    *   [Setting up Linux](/docs/tutorial/development-environment#setting-up-linux)
    *   [Choosing an Editor](/docs/tutorial/development-environment#a-good-editor)
*   [Creating your First App](/docs/tutorial/first-app)
    
    *   [Installing Electron](/docs/tutorial/first-app#installing-electron)
    *   [Electron Development in a Nutshell](/docs/tutorial/first-app#electron-development-in-a-nutshell)
    *   [Running Your App](/docs/tutorial/first-app#running-your-app)
*   [Boilerplates and CLIs](/docs/tutorial/boilerplates-and-clis)
    
    *   [Boilerplate vs CLI](/docs/tutorial/boilerplates-and-clis#boilerplate-vs-cli)
    *   [electron-forge](/docs/tutorial/boilerplates-and-clis#electron-forge)
    *   [electron-builder](/docs/tutorial/boilerplates-and-clis#electron-builder)
    *   [electron-react-boilerplate](/docs/tutorial/boilerplates-and-clis#electron-react-boilerplate)
    *   [Other Tools and Boilerplates](/docs/tutorial/boilerplates-and-clis#other-tools-and-boilerplates)
*   [Application Architecture](/docs/tutorial/application-architecture)
    
    *   [Main and Renderer Processes](/docs/tutorial/application-architecture#main-and-renderer-processes)
    *   [Using Electron's APIs](/docs/tutorial/application-architecture#using-electron-apis)
    *   [Using Node.js APIs](/docs/tutorial/application-architecture#using-nodejs-apis)
    *   [Using Native Node.js Modules](/docs/tutorial/using-native-node-modules)
*   Adding Features to Your App
    
    *   [Notifications](/docs/tutorial/notifications)
    *   [Recent Documents](/docs/tutorial/desktop-environment-integration#recent-documents)
    *   [Application Progress](/docs/tutorial/progress-bar)
    *   [Custom Dock Menu](/docs/tutorial/macos-dock)
    *   [Custom Windows Taskbar](/docs/tutorial/windows-taskbar)
    *   [Custom Linux Desktop Actions](/docs/tutorial/linux-desktop-actions)
    *   [Keyboard Shortcuts](/docs/tutorial/keyboard-shortcuts)
    *   [Offline/Online Detection](/docs/tutorial/online-offline-events)
    *   [Represented File for macOS BrowserWindows](/docs/tutorial/represented-file)
    *   [Native File Drag & Drop](/docs/tutorial/native-file-drag-drop)
*   [Accessibility](/docs/tutorial/accessibility)
    
    *   [Spectron](/docs/tutorial/accessibility#spectron)
    *   [Devtron](/docs/tutorial/accessibility#devtron)
    *   [Enabling Accessibility](/docs/tutorial/accessibility#enabling-accessibility)
*   [Testing and Debugging](/docs/tutorial/application-debugging)
    
    *   [Debugging the Main Process](/docs/tutorial/debugging-main-process)
    *   [Using Selenium and WebDriver](/docs/tutorial/using-selenium-and-webdriver)
    *   [Testing on Headless CI Systems (Travis, Jenkins)](/docs/tutorial/testing-on-headless-ci)
    *   [DevTools Extension](/docs/tutorial/devtools-extension)
    *   [Automated Testing with a Custom Driver](/docs/tutorial/automated-testing-with-a-custom-driver)
*   Packaging
    
    *   [Code Signing](/docs/tutorial/code-signing)
*   [Distribution](/docs/tutorial/application-distribution)
    
    *   [Support](/docs/tutorial/support)
    *   [Mac App Store](/docs/tutorial/mac-app-store-submission-guide)
    *   [Windows Store](/docs/tutorial/windows-store-guide)
    *   [Snapcraft](/docs/tutorial/snapcraft)
*   [Security](/docs/tutorial/security)
    
    *   [Reporting Security Issues](/docs/tutorial/security#reporting-security-issues)
    *   [Chromium Security Issues and Upgrades](/docs/tutorial/security#chromium-security-issues-and-upgrades)
    *   [Electron Security Warnings](/docs/tutorial/security#electron-security-warnings)
    *   [Security Checklist](/docs/tutorial/security#checklist-security-recommendations)
*   [Updates](/docs/tutorial/updates)
    
    *   [Deploying an Update Server](/docs/tutorial/updates#deploying-an-update-server)
    *   [Implementing Updates in Your App](/docs/tutorial/updates#implementing-updates-in-your-app)
    *   [Applying Updates](/docs/tutorial/updates#applying-updates)

[Detailed Tutorials](#detailed-tutorials)
-----------------------------------------

These individual tutorials expand on topics discussed in the guide above.

*   [In Detail: Installing Electron](/docs/tutorial/installation)
    
    *   [Proxies](/docs/tutorial/installation#proxies)
    *   [Custom Mirrors and Caches](/docs/tutorial/installation#custom-mirrors-and-caches)
    *   [Troubleshooting](/docs/tutorial/installation#troubleshooting)
*   [In Detail: Electron's Versioning Scheme](/docs/tutorial/electron-versioning)
    
    *   [semver](/docs/tutorial/electron-versioning#semver)
    *   [Stabilization Branches](/docs/tutorial/electron-versioning#stabilization-branches)
    *   [Beta Releases and Bug Fixes](/docs/tutorial/electron-versioning#beta-releases-and-bug-fixes)
*   [In Detail: Packaging App Source Code with asar](/docs/tutorial/application-packaging)
    
    *   [Generating asar Archives](/docs/tutorial/application-packaging#generating-asar-archives)
    *   [Using asar Archives](/docs/tutorial/application-packaging#using-asar-archives)
    *   [Limitations](/docs/tutorial/application-packaging#limitations-of-the-node-api)
    *   [Adding Unpacked Files to asar Archives](/docs/tutorial/application-packaging#adding-unpacked-files-to-asar-archives)
*   [In Detail: Testing Widevine CDM](/docs/tutorial/testing-widevine-cdm)
*   [In Detail: Using Pepper Flash Plugin](/docs/tutorial/using-pepper-flash-plugin)
*   [Offscreen Rendering](/docs/tutorial/offscreen-rendering)

* * *

*   [Glossary of Terms](/docs/glossary)

[API References](#api-references)
---------------------------------

*   [Synopsis](/docs/api/synopsis)
*   [Process Object](/docs/api/process)
*   [Supported Chrome Command Line Switches](/docs/api/chrome-command-line-switches)
*   [Environment Variables](/docs/api/environment-variables)
*   [Breaking API Changes](/docs/api/breaking-changes)

### [Custom DOM Elements:](#custom-dom-elements)

*   [`File` Object](/docs/api/file-object)
*   [`<webview>` Tag](/docs/api/webview-tag)
*   [`window.open` Function](/docs/api/window-open)

### [Modules for the Main Process:](#modules-for-the-main-process)

*   [app](/docs/api/app)
*   [autoUpdater](/docs/api/auto-updater)
*   [BrowserView](/docs/api/browser-view)
*   [BrowserWindow](/docs/api/browser-window)
*   [contentTracing](/docs/api/content-tracing)
*   [dialog](/docs/api/dialog)
*   [globalShortcut](/docs/api/global-shortcut)
*   [inAppPurchase](/docs/api/in-app-purchase)
*   [ipcMain](/docs/api/ipc-main)
*   [Menu](/docs/api/menu)
*   [MenuItem](/docs/api/menu-item)
*   [net](/docs/api/net)
*   [netLog](/docs/api/net-log)
*   [powerMonitor](/docs/api/power-monitor)
*   [powerSaveBlocker](/docs/api/power-save-blocker)
*   [protocol](/docs/api/protocol)
*   [session](/docs/api/session)
*   [systemPreferences](/docs/api/system-preferences)
*   [Tray](/docs/api/tray)
*   [webContents](/docs/api/web-contents)

### [Modules for the Renderer Process (Web Page):](#modules-for-the-renderer-process-web-page)

*   [desktopCapturer](/docs/api/desktop-capturer)
*   [ipcRenderer](/docs/api/ipc-renderer)
*   [remote](/docs/api/remote)
*   [webFrame](/docs/api/web-frame)

### [Modules for Both Processes:](#modules-for-both-processes)

*   [clipboard](/docs/api/clipboard)
*   [crashReporter](/docs/api/crash-reporter)
*   [nativeImage](/docs/api/native-image)
*   [screen](/docs/api/screen)
*   [shell](/docs/api/shell)

[Development](#development)
---------------------------

See [development/README.md](/docs/development/README)

* * *

[Recent Documents (Windows & macOS)](#recent-documents-windows--macos)
======================================================================

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

**JumpList:**

![JumpList Recent Files](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**Application dock menu:**

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

To add a file to recent documents, you can use the [app.addRecentDocument](/docs/api/app#appaddrecentdocumentpath-macos-windows) API:

    const { app } = require('electron')
    app.addRecentDocument('/Users/USERNAME/Desktop/work.type')

And you can use [app.clearRecentDocuments](/docs/api/app#appclearrecentdocuments-macos-windows) API to empty the recent documents list:

    const { app } = require('electron')
    app.clearRecentDocuments()

[Windows Notes](#windows-notes)
-------------------------------

In order to be able to use this feature on Windows, your application has to be registered as a handler of the file type of the document, otherwise the file won't appear in JumpList even after you have added it. You can find everything on registering your application in [Application Registration](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx).

When a user clicks a file from the JumpList, a new instance of your application will be started with the path of the file added as a command line argument.

[macOS Notes](#macos-notes)
---------------------------

When a file is requested from the recent documents menu, the `open-file` event of `app` module will be emitted for it.

* * *

[Rectangle Object](#rectangle-object)
=====================================

*   `x` Number - The x coordinate of the origin of the rectangle (must be an integer).
*   `y` Number - The y coordinate of the origin of the rectangle (must be an integer).
*   `width` Number - The width of the rectangle (must be an integer).
*   `height` Number - The height of the rectangle (must be an integer).

* * *

[Referrer Object](#referrer-object)
===================================

*   `url` String - HTTP Referrer URL.
*   `policy` String - Can be `default`, `unsafe-url`, `no-referrer-when-downgrade`, `no-referrer`, `origin`, `strict-origin-when-cross-origin`, `same-origin` or `strict-origin`. See the [Referrer-Policy spec](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy) for more details on the meaning of these values.

* * *

[Releasing](#releasing)
=======================

This document describes the process for releasing a new version of Electron.

[Set your tokens and environment variables](#set-your-tokens-and-environment-variables)
---------------------------------------------------------------------------------------

You'll need Electron S3 credentials in order to create and upload an Electron release. Contact a team member for more information.

There are a handful of `*_TOKEN` environment variables needed by the release scripts:

*   `ELECTRON_GITHUB_TOKEN`: Create this by visiting [https://github.com/settings/tokens/new?scopes=repo](https://github.com/settings/tokens/new?scopes=repo)
*   `APPVEYOR_TOKEN`: Create a token from [https://windows-ci.electronjs.org/api-token](https://windows-ci.electronjs.org/api-token) If you don't have an account, ask a team member to add you.
*   `CIRCLE_TOKEN`: Create a token from "Personal API Tokens" at [https://circleci.com/account/api](https://circleci.com/account/api)
*   `VSTS_TOKEN`: Create a Personal Access Token at [https://github.visualstudio.com/\_usersSettings/tokens](https://github.visualstudio.com/_usersSettings/tokens) or [https://github.visualstudio.com/\_details/security/tokens](https://github.visualstudio.com/_details/security/tokens) with the scope of `Build (read and execute)`.
*   `ELECTRON_S3_BUCKET`:
*   `ELECTRON_S3_ACCESS_KEY`:
*   `ELECTRON_S3_SECRET_KEY`: If you don't have these, ask a team member to help you.

Once you've generated these tokens, put them in a `.env` file in the root directory of the project. This file is gitignored, and will be loaded into the environment by the release scripts.

[Determine which branch to release from](#determine-which-branch-to-release-from)
---------------------------------------------------------------------------------

*   **If releasing beta,** run the scripts below from `master`.
*   **If releasing a stable version,** run the scripts below from the branch you're stabilizing.

[Find out what version change is needed](#find-out-what-version-change-is-needed)
---------------------------------------------------------------------------------

Run `npm run prepare-release -- --notesOnly` to view auto generated release notes. The notes generated should help you determine if this is a major, minor, patch, or beta version change. Read the [Version Change Rules](/docs/tutorial/electron-versioning#semver) for more information.

**NB:** If releasing from a branch, e.g. 1-8-x, check out the branch with `git checkout 1-8-x` rather than `git checkout -b remotes/origin/1-8-x`. The scripts need `git rev-parse --abbrev-ref HEAD` to return a short name, e.g. no `remotes/origin/`

[Run the prepare-release script](#run-the-prepare-release-script)
-----------------------------------------------------------------

The prepare release script will do the following: 1. Check if a release is already in process and if so it will halt. 2. Create a release branch. 3. Bump the version number in several files. See [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) for an example. 4. Create a draft release on GitHub with auto-generated release notes. 5. Push the release branch. 6. Call the APIs to run the release builds.

Once you have determined which type of version change is needed, run the `prepare-release` script with arguments according to your need:

*   `[major|minor|patch|beta]` to increment one of the version numbers, or
*   `--stable` to indicate this is a stable version

For example:

### [Major version change](#major-version-change)

    npm run prepare-release -- major

### [Minor version change](#minor-version-change)

    npm run prepare-release -- minor

### [Patch version change](#patch-version-change)

    npm run prepare-release -- patch --stable

### [Beta version change](#beta-version-change)

    npm run prepare-release -- beta

### [Promote beta to stable](#promote-beta-to-stable)

    npm run prepare-release -- --stable

Tip: You can test the new version number before running `prepare-release` with a dry run of the `bump-version` script with the same major/minor/patch/beta arguments, e.g.:

    $ ./script/bump-version.py --bump minor --dry-run

[Wait for builds ⏳](#wait-for-builds-hourglass_flowing_sand)
------------------------------------------------------------

The `prepare-release` script will trigger the builds via API calls. To monitor the build progress, see the following pages:

*   [electron-release-mas-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=19&_a=completed) for MAS builds.
*   [electron-release-osx-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=18&_a=completed) for OSX builds.
*   [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for Linux builds.
*   [windows-ci.electronjs.org/project/AppVeyor/electron-39ng6](https://windows-ci.electronjs.org/project/AppVeyor/electron-39ng6) for Windows 32-bit builds.
*   [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) for Windows 64-bit builds.

[Compile release notes](#compile-release-notes)
-----------------------------------------------

Writing release notes is a good way to keep yourself busy while the builds are running. For prior art, see existing releases on [the releases page](https://github.com/electron/electron/releases).

Tips:

*   Each listed item should reference a PR on electron/electron, not an issue, nor a PR from another repo like libcc.
*   No need to use link markup when referencing PRs. Strings like `#123` will automatically be converted to links on github.com.
*   To see the version of Chromium, V8, and Node in every version of Electron, visit [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### [Patch releases](#patch-releases)

For a `patch` release, use the following format:

    ## Bug Fixes
    
    * Fixed a cross-platform thing. #123
    
    ### Linux
    
    * Fixed a Linux thing. #123
    
    ### macOS
    
    * Fixed a macOS thing. #123
    
    ### Windows
    
    * Fixed a Windows thing. #1234

### [Minor releases](#minor-releases)

For a `minor` release, e.g. `1.8.0`, use this format:

    ## Upgrades
    
    - Upgraded from Node `oldVersion` to `newVersion`. #123
    
    ## API Changes
    
    * Changed a thing. #123
    
    ### Linux
    
    * Changed a Linux thing. #123
    
    ### macOS
    
    * Changed a macOS thing. #123
    
    ### Windows
    
    * Changed a Windows thing. #123

### [Major releases](#major-releases)

    ## Upgrades
    
    - Upgraded from Chromium `oldVersion` to `newVersion`. #123
    - Upgraded from Node `oldVersion` to `newVersion`. #123
    
    ## Breaking API changes
    
    * Changed a thing. #123
    
    ### Linux
    
    * Changed a Linux thing. #123
    
    ### macOS
    
    * Changed a macOS thing. #123
    
    ### Windows
    
    * Changed a Windows thing. #123
    
    ## Other Changes
    
    - Some other change. #123

### [Beta releases](#beta-releases)

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

    **Note:** This is a beta release and most likely will have have some
    instability and/or regressions.
    
    Please file new issues for any bugs you find in it.
    
    This release is published to [npm](https://www.npmjs.com/package/electron)
    under the `beta` tag and can be installed via `npm install electron@beta`.

[Edit the release draft](#edit-the-release-draft)
-------------------------------------------------

1.  Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2.  Edit the release and add release notes.
3.  Click 'Save draft'. **Do not click 'Publish release'!**
4.  Wait for all builds to pass before proceeding.
5.  In the branch, verify that the release's files have been created:

    $ npm run release -- --validateRelease

Note, if you need to run `--validateRelease` more than once to check the assets, run it as above the first time, then `node ./script/release.js --validateRelease` for subsequent calls so that you don't have to rebuild each time you want to check the assets.

[Publish the release](#publish-the-release)
-------------------------------------------

Once the merge has finished successfully, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Publish the release on GitHub

[Publish to npm](#publish-to-npm)
---------------------------------

Before publishing to npm, you'll need to log into npm as Electron. Optionally, you may find [npmrc](https://www.npmjs.com/package/npmrc) to be a useful way to keep Electron's profile side-by-side with your own:

    $ sudo npm install -g npmrc
    $ npmrc -c electron
    Removing old .npmrc (default)
    Activating .npmrc "electron"

The Electron account's credentials are kept by GitHub in a password manager. You'll also need to have access to an 2FA authenticator app with the appropriate OTP generator code to log in.

    $ npm login
    Username: electron-nightly
    Password: <This can be found under NPM Electron Nightly on LastPass>
    Email: (this IS public) electron@github.com

Publish the release to npm. Before running this you'll need to have set `ELECTRON_NPM_OTP` as an environment variable using a code from the aforementioned 2FA authenticator app.

    $ npm whoami
    electron-nightly
    $ npm run publish-to-npm

After publishing, you can check the `latest` release:

    $ npm dist-tag ls electron

If for some reason `npm run publish-to-npm` fails, you can tag the release manually:

    $ npm dist-tag add electron@<version> <tag>

e.g.:

    $ npm dist-tag add electron@2.0.0 latest

[Troubleshooting](#troubleshooting)
===================================

[Rerun broken builds](#rerun-broken-builds)
-------------------------------------------

If a release build fails for some reason, you can use `script/ci-release-build.js` to rerun a release build:

### [Rerun all linux builds:](#rerun-all-linux-builds)

    node script/ci-release-build.js --ci=CircleCI --ghRelease TARGET_BRANCH
    (TARGET_BRANCH) is the branch you are releasing from.

### [Rerun all macOS builds:](#rerun-all-macos-builds)

    node script/ci-release-build.js --ci=VSTS --ghRelease TARGET_BRANCH
    (TARGET_BRANCH) is the branch you are releasing from.

### [Rerun all Windows builds:](#rerun-all-windows-builds)

    node script/ci-release-build.js --ci=AppVeyor --ghRelease TARGET_BRANCH
    (TARGET_BRANCH) is the branch you are releasing from.

Additionally you can pass a job name to the script to run an individual job, eg:

    node script/ci-release-build.js --ci=AppVeyor --ghRelease --job=electron-x64 TARGET_BRANCH

[Fix missing binaries of a release manually](#fix-missing-binaries-of-a-release-manually)
-----------------------------------------------------------------------------------------

In the case of a corrupted release with broken CI machines, we might have to re-upload the binaries for an already published release.

The first step is to go to the [Releases](https://github.com/electron/electron/releases) page and delete the corrupted binaries with the `SHASUMS256.txt` checksum file.

Then manually create distributions for each platform and upload them:

    # Checkout the version to re-upload.
    git checkout vX.Y.Z
    
    # Create release build
    gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
    
    # To compile for specific arch, instead set
    gn gen out/Release-<TARGET_ARCH> --args='import(\"//electron/build/args/release.gn\") target_cpu = "[arm|x64|ia32]"'
    
    # Build by running ninja with the electron target
    ninja -C out/Release electron
    ninja -C out/Release electron:dist_zip
    
    # Explicitly allow overwriting a published release.
    ./script/upload.py --overwrite

Allowable values for [target\_cpu](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values) and [target\_os](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values).

After re-uploading all distributions, publish again to upload the checksum file:

    npm run release

* * *

[remote](#remote)
=================

> Use main process modules from the renderer process.

Process: [Renderer](/docs/glossary#renderer-process)

The `remote` module provides a simple way to do inter-process communication (IPC) between the renderer process (web page) and the main process.

In Electron, GUI-related modules (such as `dialog`, `menu` etc.) are only available in the main process, not in the renderer process. In order to use them from the renderer process, the `ipc` module is necessary to send inter-process messages to the main process. With the `remote` module, you can invoke methods of the main process object without explicitly sending inter-process messages, similar to Java's [RMI](https://en.wikipedia.org/wiki/Java_remote_method_invocation). An example of creating a browser window from a renderer process:

    const { BrowserWindow } = require('electron').remote
    let win = new BrowserWindow({ width: 800, height: 600 })
    win.loadURL('https://github.com')

**Note:** For the reverse (access the renderer process from the main process), you can use [webContents.executeJavaScript](/docs/api/web-contents#contentsexecutejavascriptcode-usergesture-callback).

**Note:** The remote module can be disabled for security reasons in the following contexts:

*   [`BrowserWindow`](/docs/api/browser-window) - by setting the `enableRemoteModule` option to `false`.
*   [`<webview>`](/docs/api/webview-tag) - by setting the `enableremotemodule` attribute to `false`.

[Remote Objects](#remote-objects)
---------------------------------

Each object (including functions) returned by the `remote` module represents an object in the main process (we call it a remote object or remote function). When you invoke methods of a remote object, call a remote function, or create a new object with the remote constructor (function), you are actually sending synchronous inter-process messages.

In the example above, both [`BrowserWindow`](/docs/api/browser-window) and `win` were remote objects and `new BrowserWindow` didn't create a `BrowserWindow` object in the renderer process. Instead, it created a `BrowserWindow` object in the main process and returned the corresponding remote object in the renderer process, namely the `win` object.

**Note:** Only [enumerable properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) which are present when the remote object is first referenced are accessible via remote.

**Note:** Arrays and Buffers are copied over IPC when accessed via the `remote` module. Modifying them in the renderer process does not modify them in the main process and vice versa.

[Lifetime of Remote Objects](#lifetime-of-remote-objects)
---------------------------------------------------------

Electron makes sure that as long as the remote object in the renderer process lives (in other words, has not been garbage collected), the corresponding object in the main process will not be released. When the remote object has been garbage collected, the corresponding object in the main process will be dereferenced.

If the remote object is leaked in the renderer process (e.g. stored in a map but never freed), the corresponding object in the main process will also be leaked, so you should be very careful not to leak remote objects.

Primary value types like strings and numbers, however, are sent by copy.

[Passing callbacks to the main process](#passing-callbacks-to-the-main-process)
-------------------------------------------------------------------------------

Code in the main process can accept callbacks from the renderer - for instance the `remote` module - but you should be extremely careful when using this feature.

First, in order to avoid deadlocks, the callbacks passed to the main process are called asynchronously. You should not expect the main process to get the return value of the passed callbacks.

For instance you can't use a function from the renderer process in an `Array.map` called in the main process:

    // main process mapNumbers.js
    exports.withRendererCallback = (mapper) => {
      return [1, 2, 3].map(mapper)
    }
    
    exports.withLocalCallback = () => {
      return [1, 2, 3].map(x => x + 1)
    }

    // renderer process
    const mapNumbers = require('electron').remote.require('./mapNumbers')
    const withRendererCb = mapNumbers.withRendererCallback(x => x + 1)
    const withLocalCb = mapNumbers.withLocalCallback()
    
    console.log(withRendererCb, withLocalCb)
    // [undefined, undefined, undefined], [2, 3, 4]

As you can see, the renderer callback's synchronous return value was not as expected, and didn't match the return value of an identical callback that lives in the main process.

Second, the callbacks passed to the main process will persist until the main process garbage-collects them.

For example, the following code seems innocent at first glance. It installs a callback for the `close` event on a remote object:

    require('electron').remote.getCurrentWindow().on('close', () => {
      // window was closed...
    })

But remember the callback is referenced by the main process until you explicitly uninstall it. If you do not, each time you reload your window the callback will be installed again, leaking one callback for each restart.

To make things worse, since the context of previously installed callbacks has been released, exceptions will be raised in the main process when the `close` event is emitted.

To avoid this problem, ensure you clean up any references to renderer callbacks passed to the main process. This involves cleaning up event handlers, or ensuring the main process is explicitly told to dereference callbacks that came from a renderer process that is exiting.

[Accessing built-in modules in the main process](#accessing-built-in-modules-in-the-main-process)
-------------------------------------------------------------------------------------------------

The built-in modules in the main process are added as getters in the `remote` module, so you can use them directly like the `electron` module.

    const app = require('electron').remote.app
    console.log(app)

[Methods](#methods)
-------------------

The `remote` module has the following methods:

### [`remote.require(module)`](#remoterequiremodule)

*   `module` String

Returns `any` - The object returned by `require(module)` in the main process. Modules specified by their relative path will resolve relative to the entrypoint of the main process.

e.g.

    project/
    ├── main
    │   ├── foo.js
    │   └── index.js
    ├── package.json
    └── renderer
        └── index.js

    // main process: main/index.js
    const { app } = require('electron')
    app.on('ready', () => { /* ... */ })

    // some relative module: main/foo.js
    module.exports = 'bar'

    // renderer process: renderer/index.js
    const foo = require('electron').remote.require('./foo') // bar

### [`remote.getCurrentWindow()`](#remotegetcurrentwindow)

Returns [`BrowserWindow`](/docs/api/browser-window) - The window to which this web page belongs.

**Note:** Do not use `removeAllListeners` on [`BrowserWindow`](/docs/api/browser-window). Use of this can remove all [`blur`](https://developer.mozilla.org/en-US/docs/Web/Events/blur) listeners, disable click events on touch bar buttons, and other unintended consequences.

### [`remote.getCurrentWebContents()`](#remotegetcurrentwebcontents)

Returns [`WebContents`](/docs/api/web-contents) - The web contents of this web page.

### [`remote.getGlobal(name)`](#remotegetglobalname)

*   `name` String

Returns `any` - The global variable of `name` (e.g. `global[name]`) in the main process.

[Properties](#properties)
-------------------------

### [`remote.process`](#remoteprocess)

The `process` object in the main process. This is the same as `remote.getGlobal('process')` but is cached.

* * *

[RemoveClientCertificate Object](#removeclientcertificate-object)
=================================================================

*   `type` String - `clientCertificate`.
*   `origin` String - Origin of the server whose associated client certificate must be removed from the cache.

* * *

[RemovePassword Object](#removepassword-object)
===============================================

*   `type` String - `password`.
*   `origin` String (optional) - When provided, the authentication info related to the origin will only be removed otherwise the entire cache will be cleared.
*   `scheme` String (optional) - Scheme of the authentication. Can be `basic`, `digest`, `ntlm`, `negotiate`. Must be provided if removing by `origin`.
*   `realm` String (optional) - Realm of the authentication. Must be provided if removing by `origin`.
*   `username` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.
*   `password` String (optional) - Credentials of the authentication. Must be provided if removing by `origin`.

* * *

[REPL](#repl)
=============

Read-Eval-Print-Loop (REPL) is a simple, interactive computer programming environment that takes single user inputs (i.e. single expressions), evaluates them, and returns the result to the user.

The `repl` module provides a REPL implementation that can be accessed using:

*   Assuming you have `electron` or `electron-prebuilt` installed as a local project dependency:
    
        ./node_modules/.bin/electron --interactive
    
*   Assuming you have `electron` or `electron-prebuilt` installed globally:
    
        electron --interactive
    

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Note:** `electron --interactive` is not available on Windows.

More information can be found in the [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).

* * *

[Represented File for macOS BrowserWindows](#represented-file-for-macos-browserwindows)
=======================================================================================

On macOS a window can set its represented file, so the file's icon can show in the title bar and when users Command-Click or Control-Click on the title a path popup will show.

You can also set the edited state of a window so that the file icon can indicate whether the document in this window has been modified.

**Represented file popup menu:**

![Represented File](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename](/docs/api/browser-window#winsetrepresentedfilenamefilename-macos) and [BrowserWindow.setDocumentEdited](/docs/api/browser-window#winsetdocumenteditededited-macos) APIs:

    const { BrowserWindow } = require('electron')
    
    const win = new BrowserWindow()
    win.setRepresentedFilename('/etc/passwd')
    win.setDocumentEdited(true)

* * *

[`sandbox` Option](#sandbox-option)
===================================

> Create a browser window with a renderer that can run inside Chromium OS sandbox. With this option enabled, the renderer must communicate via IPC to the main process in order to access node APIs. However, in order to enable the Chromium OS sandbox, Electron must be run with the `--enable-sandbox` command line argument.

One of the key security features of Chromium is that all blink rendering/JavaScript code is executed within a sandbox. This sandbox uses OS-specific features to ensure that exploits in the renderer process cannot harm the system.

In other words, when the sandbox is enabled, the renderers can only make changes to the system by delegating tasks to the main process via IPC. [Here's](https://www.chromium.org/developers/design-documents/sandbox) more information about the sandbox.

Since a major feature in Electron is the ability to run Node.js in the renderer process (making it easier to develop desktop applications using web technologies), the sandbox is disabled by electron. This is because most Node.js APIs require system access. `require()` for example, is not possible without file system permissions, which are not available in a sandboxed environment.

Usually this is not a problem for desktop applications since the code is always trusted, but it makes Electron less secure than Chromium for displaying untrusted web content. For applications that require more security, the `sandbox` flag will force Electron to spawn a classic Chromium renderer that is compatible with the sandbox.

A sandboxed renderer doesn't have a Node.js environment running and doesn't expose Node.js JavaScript APIs to client code. The only exception is the preload script, which has access to a subset of the Electron renderer API.

Another difference is that sandboxed renderers don't modify any of the default JavaScript APIs. Consequently, some APIs such as `window.open` will work as they do in Chromium (i.e. they do not return a [`BrowserWindowProxy`](/docs/api/browser-window-proxy)).

[Example](#example)
-------------------

To create a sandboxed window, pass `sandbox: true` to `webPreferences`:

    let win
    app.on('ready', () => {
      win = new BrowserWindow({
        webPreferences: {
          sandbox: true
        }
      })
      win.loadURL('http://google.com')
    })

In the above code the [`BrowserWindow`](/docs/api/browser-window) that was created has Node.js disabled and can communicate only via IPC. The use of this option stops Electron from creating a Node.js runtime in the renderer. Also, within this new window `window.open` follows the native behaviour (by default Electron creates a [`BrowserWindow`](/docs/api/browser-window) and returns a proxy to this via `window.open`).

It is important to note that this option alone won't enable the OS-enforced sandbox. To enable this feature, the `--enable-sandbox` command-line argument must be passed to electron, which will force `sandbox: true` for all `BrowserWindow` instances.

To enable OS-enforced sandbox on `BrowserWindow` or `webview` process with `sandbox:true` without causing entire app to be in sandbox, `--enable-mixed-sandbox` command-line argument must be passed to electron. This option is currently only supported on macOS and Windows.

    let win
    app.on('ready', () => {
      // no need to pass `sandbox: true` since `--enable-sandbox` was enabled.
      win = new BrowserWindow()
      win.loadURL('http://google.com')
    })

Note that it is not enough to call `app.commandLine.appendSwitch('--enable-sandbox')`, as electron/node startup code runs after it is possible to make changes to Chromium sandbox settings. The switch must be passed to Electron on the command-line:

    electron --enable-sandbox app.js

It is not possible to have the OS sandbox active only for some renderers, if `--enable-sandbox` is enabled, normal Electron windows cannot be created.

If you need to mix sandboxed and non-sandboxed renderers in one application, omit the `--enable-sandbox` argument. Without this argument, windows created with `sandbox: true` will still have Node.js disabled and communicate only via IPC, which by itself is already a gain from security POV.

[Preload](#preload)
-------------------

An app can make customizations to sandboxed renderers using a preload script. Here's an example:

    let win
    app.on('ready', () => {
      win = new BrowserWindow({
        webPreferences: {
          sandbox: true,
          preload: 'preload.js'
        }
      })
      win.loadURL('http://google.com')
    })

and preload.js:

    // This file is loaded whenever a javascript context is created. It runs in a
    // private scope that can access a subset of Electron renderer APIs. We must be
    // careful to not leak any objects into the global scope!
    const fs = require('fs')
    const { ipcRenderer } = require('electron')
    
    // read a configuration file using the `fs` module
    const buf = fs.readFileSync('allowed-popup-urls.json')
    const allowedUrls = JSON.parse(buf.toString('utf8'))
    
    const defaultWindowOpen = window.open
    
    function customWindowOpen (url, ...args) {
      if (allowedUrls.indexOf(url) === -1) {
        ipcRenderer.sendSync('blocked-popup-notification', location.origin, url)
        return null
      }
      return defaultWindowOpen(url, ...args)
    }
    
    window.open = customWindowOpen

Important things to notice in the preload script:

*   Even though the sandboxed renderer doesn't have Node.js running, it still has access to a limited node-like environment: `Buffer`, `process`, `setImmediate` and `require` are available.
*   The preload script can indirectly access all APIs from the main process through the `remote` and `ipcRenderer` modules. This is how `fs` (used above) and other modules are implemented: They are proxies to remote counterparts in the main process.
*   The preload script must be contained in a single script, but it is possible to have complex preload code composed with multiple modules by using a tool like browserify, as explained below. In fact, browserify is already used by Electron to provide a node-like environment to the preload script.

To create a browserify bundle and use it as a preload script, something like the following should be used:

      browserify preload/index.js \
        -x electron \
        -x fs \
        --insert-global-vars=__filename,__dirname -o preload.js

The `-x` flag should be used with any required module that is already exposed in the preload scope, and tells browserify to use the enclosing `require` function for it. `--insert-global-vars` will ensure that `process`, `Buffer` and `setImmediate` are also taken from the enclosing scope(normally browserify injects code for those).

Currently the `require` function provided in the preload scope exposes the following modules:

*   `child_process`
*   `electron`
    
    *   `crashReporter`
    *   `remote`
    *   `ipcRenderer`
    *   `webFrame`
*   `fs`
*   `os`
*   `timers`
*   `url`

More may be added as needed to expose more Electron APIs in the sandbox, but any module in the main process can already be used through `electron.remote.require`.

[Status](#status)
-----------------

Please use the `sandbox` option with care, as it is still an experimental feature. We are still not aware of the security implications of exposing some Electron renderer APIs to the preload script, but here are some things to consider before rendering untrusted content:

*   A preload script can accidentally leak privileged APIs to untrusted code.
*   Some bug in V8 engine may allow malicious code to access the renderer preload APIs, effectively granting full access to the system through the `remote` module.

Since rendering untrusted content in Electron is still uncharted territory, the APIs exposed to the sandbox preload script should be considered more unstable than the rest of Electron APIs, and may have breaking changes to fix security issues.

One planned enhancement that should greatly increase security is to block IPC messages from sandboxed renderers by default, allowing the main process to explicitly define a set of messages the renderer is allowed to send.

* * *

[screen](#screen)
=================

> Retrieve information about screen size, displays, cursor position, etc.

Process: [Main](/docs/glossary#main-process), [Renderer](/docs/glossary#renderer-process)

You cannot require or use this module until the `ready` event of the `app` module is emitted.

In the renderer process context it depends on the [`remote`](/docs/api/remote) module, it is therefore not available when this module is disabled.

`screen` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

**Note:** In the renderer / DevTools, `window.screen` is a reserved DOM property, so writing `let { screen } = require('electron')` will not work.

An example of creating a window that fills the whole screen:

    const electron = require('electron')
    const { app, BrowserWindow } = electron
    
    let win
    
    app.on('ready', () => {
      const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize
      win = new BrowserWindow({ width, height })
      win.loadURL('https://github.com')
    })

Another example of creating a window in the external display:

    const electron = require('electron')
    const { app, BrowserWindow } = require('electron')
    
    let win
    
    app.on('ready', () => {
      let displays = electron.screen.getAllDisplays()
      let externalDisplay = displays.find((display) => {
        return display.bounds.x !== 0 || display.bounds.y !== 0
      })
    
      if (externalDisplay) {
        win = new BrowserWindow({
          x: externalDisplay.bounds.x + 50,
          y: externalDisplay.bounds.y + 50
        })
        win.loadURL('https://github.com')
      }
    })

[Events](#events)
-----------------

The `screen` module emits the following events:

### [Event: 'display-added'](#event-display-added)

Returns:

*   `event` Event
*   `newDisplay` [Display](/docs/api/structures/display)

Emitted when `newDisplay` has been added.

### [Event: 'display-removed'](#event-display-removed)

Returns:

*   `event` Event
*   `oldDisplay` [Display](/docs/api/structures/display)

Emitted when `oldDisplay` has been removed.

### [Event: 'display-metrics-changed'](#event-display-metrics-changed)

Returns:

*   `event` Event
*   `display` [Display](/docs/api/structures/display)
*   `changedMetrics` String\[\]

Emitted when one or more metrics change in a `display`. The `changedMetrics` is an array of strings that describe the changes. Possible changes are `bounds`, `workArea`, `scaleFactor` and `rotation`.

[Methods](#methods)
-------------------

The `screen` module has the following methods:

### [`screen.getCursorScreenPoint()`](#screengetcursorscreenpoint)

Returns [`Point`](/docs/api/structures/point)

The current absolute position of the mouse pointer.

### [`screen.getPrimaryDisplay()`](#screengetprimarydisplay)

Returns [`Display`](/docs/api/structures/display) - The primary display.

### [`screen.getAllDisplays()`](#screengetalldisplays)

Returns [`Display[]`](/docs/api/structures/display) - An array of displays that are currently available.

### [`screen.getDisplayNearestPoint(point)`](#screengetdisplaynearestpointpoint)

*   `point` [Point](/docs/api/structures/point)

Returns [`Display`](/docs/api/structures/display) - The display nearest the specified point.

### [`screen.getDisplayMatching(rect)`](#screengetdisplaymatchingrect)

*   `rect` [Rectangle](/docs/api/structures/rectangle)

Returns [`Display`](/docs/api/structures/display) - The display that most closely intersects the provided bounds.

### [`screen.screenToDipPoint(point)` _Windows_](#screenscreentodippointpoint-windows)

*   `point` [Point](/docs/api/structures/point)

Returns [`Point`](/docs/api/structures/point)

Converts a screen physical point to a screen DIP point. The DPI scale is performed relative to the display containing the physical point.

### [`screen.dipToScreenPoint(point)` _Windows_](#screendiptoscreenpointpoint-windows)

*   `point` [Point](/docs/api/structures/point)

Returns [`Point`](/docs/api/structures/point)

Converts a screen DIP point to a screen physical point. The DPI scale is performed relative to the display containing the DIP point.

### [`screen.screenToDipRect(window, rect)` _Windows_](#screenscreentodiprectwindow-rect-windows)

*   `window` [BrowserWindow](/docs/api/browser-window) | null
*   `rect` [Rectangle](/docs/api/structures/rectangle)

Returns [`Rectangle`](/docs/api/structures/rectangle)

Converts a screen physical rect to a screen DIP rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.

### [`screen.dipToScreenRect(window, rect)` _Windows_](#screendiptoscreenrectwindow-rect-windows)

*   `window` [BrowserWindow](/docs/api/browser-window) | null
*   `rect` [Rectangle](/docs/api/structures/rectangle)

Returns [`Rectangle`](/docs/api/structures/rectangle)

Converts a screen DIP rect to a screen physical rect. The DPI scale is performed relative to the display nearest to `window`. If `window` is null, scaling will be performed to the display nearest to `rect`.

* * *

[ScrubberItem Object](#scrubberitem-object)
===========================================

*   `label` String (optional) - The text to appear in this item.
*   `icon` NativeImage (optional) - The image to appear in this item.

* * *

[Security, Native Capabilities, and Your Responsibility](#security-native-capabilities-and-your-responsibility)
===============================================================================================================

As web developers, we usually enjoy the strong security net of the browser - the risks associated with the code we write are relatively small. Our websites are granted limited powers in a sandbox, and we trust that our users enjoy a browser built by a large team of engineers that is able to quickly respond to newly discovered security threats.

When working with Electron, it is important to understand that Electron is not a web browser. It allows you to build feature-rich desktop applications with familiar web technologies, but your code wields much greater power. JavaScript can access the filesystem, user shell, and more. This allows you to build high quality native applications, but the inherent security risks scale with the additional powers granted to your code.

With that in mind, be aware that displaying arbitrary content from untrusted sources poses a severe security risk that Electron is not intended to handle. In fact, the most popular Electron apps (Atom, Slack, Visual Studio Code, etc) display primarily local content (or trusted, secure remote content without Node integration) – if your application executes code from an online source, it is your responsibility to ensure that the code is not malicious.

[Reporting Security Issues](#reporting-security-issues)
-------------------------------------------------------

For information on how to properly disclose an Electron vulnerability, see [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

[Chromium Security Issues and Upgrades](#chromium-security-issues-and-upgrades)
-------------------------------------------------------------------------------

While Electron strives to support new versions of Chromium as soon as possible, developers should be aware that upgrading is a serious undertaking - involving hand-editing dozens or even hundreds of files. Given the resources and contributions available today, Electron will often not be on the very latest version of Chromium, lagging behind by several weeks or a few months.

We feel that our current system of updating the Chromium component strikes an appropriate balance between the resources we have available and the needs of the majority of applications built on top of the framework. We definitely are interested in hearing more about specific use cases from the people that build things on top of Electron. Pull requests and contributions supporting this effort are always very welcome.

[Security Is Everyone's Responsibility](#security-is-everyones-responsibility)
------------------------------------------------------------------------------

It is important to remember that the security of your Electron application is the result of the overall security of the framework foundation (_Chromium_, _Node.js_), Electron itself, all NPM dependencies and your code. As such, it is your responsibility to follow a few important best practices:

*   **Keep your application up-to-date with the latest Electron framework release.** When releasing your product, you’re also shipping a bundle composed of Electron, Chromium shared library and Node.js. Vulnerabilities affecting these components may impact the security of your application. By updating Electron to the latest version, you ensure that critical vulnerabilities (such as _nodeIntegration bypasses_) are already patched and cannot be exploited in your application.
    
*   **Evaluate your dependencies.** While NPM provides half a million reusable packages, it is your responsibility to choose trusted 3rd-party libraries. If you use outdated libraries affected by known vulnerabilities or rely on poorly maintained code, your application security could be in jeopardy.
    
*   **Adopt secure coding practices.** The first line of defense for your application is your own code. Common web vulnerabilities, such as Cross-Site Scripting (XSS), have a higher security impact on Electron applications hence it is highly recommended to adopt secure software development best practices and perform security testing.
    

[Isolation For Untrusted Content](#isolation-for-untrusted-content)
-------------------------------------------------------------------

A security issue exists whenever you receive code from an untrusted source (e.g. a remote server) and execute it locally. As an example, consider a remote website being displayed inside a default [`BrowserWindow`](/docs/api/browser-window). If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> ⚠️ Under no circumstances should you load and execute remote code with Node.js integration enabled. Instead, use only local files (packaged together with your application) to execute Node.js code. To display remote content, use the [`<webview>`](/docs/api/webview-tag) tag or [`BrowserView`](/docs/api/browser-view), make sure to disable the `nodeIntegration` and enable `contextIsolation`.

[Electron Security Warnings](#electron-security-warnings)
---------------------------------------------------------

From Electron 2.0 on, developers will see warnings and recommendations printed to the developer console. They only show up when the binary's name is Electron, indicating that a developer is currently looking at the console.

You can force-enable or force-disable these warnings by setting `ELECTRON_ENABLE_SECURITY_WARNINGS` or `ELECTRON_DISABLE_SECURITY_WARNINGS` on either `process.env` or the `window` object.

[Checklist: Security Recommendations](#checklist-security-recommendations)
--------------------------------------------------------------------------

You should at least follow these steps to improve the security of your application:

1.  [Only load secure content](#1-only-load-secure-content)
2.  [Disable the Node.js integration in all renderers that display remote content](#2-disable-nodejs-integration-for-remote-content)
3.  [Enable context isolation in all renderers that display remote content](#3-enable-context-isolation-for-remote-content)
4.  [Use `ses.setPermissionRequestHandler()` in all sessions that load remote content](#4-handle-session-permission-requests-from-remote-content)
5.  [Do not disable `webSecurity`](#5-do-not-disable-websecurity)
6.  [Define a `Content-Security-Policy`](#6-define-a-content-security-policy) and use restrictive rules (i.e. `script-src 'self'`)
7.  [Do not set `allowRunningInsecureContent` to `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8.  [Do not enable experimental features](#8-do-not-enable-experimental-features)
9.  [Do not use `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
10.  [`<webview>`: Do not use `allowpopups`](#10-do-not-use-allowpopups)
11.  [`<webview>`: Verify options and params](#11-verify-webview-options-before-creation)
12.  [Disable or limit navigation](#12-disable-or-limit-navigation)
13.  [Disable or limit creation of new windows](#13-disable-or-limit-creation-of-new-windows)
14.  [Do not use `openExternal` with untrusted content](#14-do-not-use-openexternal-with-untrusted-content)
15.  [Disable the `remote` module](#15-disable-the-remote-module)
16.  [Filter the `remote` module](#16-filter-the-remote-module)

To automate the detection of misconfigurations and insecure patterns, it is possible to use [electronegativity](https://github.com/doyensec/electronegativity). For additional details on potential weaknesses and implementation bugs when developing applications using Electron, please refer to this [guide for developers and auditors](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

[1) Only Load Secure Content](#1-only-load-secure-content)
----------------------------------------------------------

Any resources not included with your application should be loaded using a secure protocol like `HTTPS`. In other words, do not use insecure protocols like `HTTP`. Similarly, we recommend the use of `WSS` over `WS`, `FTPS` over `FTP`, and so on.

### [Why?](#why)

`HTTPS` has three main benefits:

1) It authenticates the remote server, ensuring your app connects to the correct host instead of an impersonator. 2) It ensures data integrity, asserting that the data was not modified while in transit between your application and the host. 3) It encrypts the traffic between your user and the destination host, making it more difficult to eavesdrop on the information sent between your app and the host.

### [How?](#how)

    // Bad
    browserWindow.loadURL('http://example.com')
    
    // Good
    browserWindow.loadURL('https://example.com')

    <!-- Bad -->
    <script crossorigin src="http://example.com/react.js"></script>
    <link rel="stylesheet" href="http://example.com/style.css">
    
    <!-- Good -->
    <script crossorigin src="https://example.com/react.js"></script>
    <link rel="stylesheet" href="https://example.com/style.css">

[2) Disable Node.js Integration for Remote Content](#2-disable-nodejs-integration-for-remote-content)
-----------------------------------------------------------------------------------------------------

It is paramount that you disable Node.js integration in any renderer ([`BrowserWindow`](/docs/api/browser-window), [`BrowserView`](/docs/api/browser-view), or [`<webview>`](/docs/api/webview-tag)) that loads remote content. The goal is to limit the powers you grant to remote content, thus making it dramatically more difficult for an attacker to harm your users should they gain the ability to execute JavaScript on your website.

After this, you can grant additional permissions for specific hosts. For example, if you are opening a BrowserWindow pointed at \`[https://example.com/"](https://example.com/%22), you can give that website exactly the abilities it needs, but no more.

### [Why?](#why)

A cross-site-scripting (XSS) attack is more dangerous if an attacker can jump out of the renderer process and execute code on the user's computer. Cross-site-scripting attacks are fairly common - and while an issue, their power is usually limited to messing with the website that they are executed on. Disabling Node.js integration helps prevent an XSS from being escalated into a so-called "Remote Code Execution" (RCE) attack.

### [How?](#how)

    // Bad
    const mainWindow = new BrowserWindow()
    mainWindow.loadURL('https://example.com')

    // Good
    const mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: false,
        nodeIntegrationInWorker: false,
        preload: path.join(app.getAppPath(), 'preload.js')
      }
    })
    
    mainWindow.loadURL('https://example.com')

    <!-- Bad -->
    <webview nodeIntegration src="page.html"></webview>
    
    <!-- Good -->
    <webview src="page.html"></webview>

When disabling Node.js integration, you can still expose APIs to your website that do consume Node.js modules or features. Preload scripts continue to have access to `require` and other Node.js features, allowing developers to expose a custom API to remotely loaded content.

In the following example preload script, the later loaded website will have access to a `window.readConfig()` method, but no Node.js features.

    const { readFileSync } = require('fs')
    
    window.readConfig = function () {
      const data = readFileSync('./config.json')
      return data
    }

[3) Enable Context Isolation for Remote Content](#3-enable-context-isolation-for-remote-content)
------------------------------------------------------------------------------------------------

Context isolation is an Electron feature that allows developers to run code in preload scripts and in Electron APIs in a dedicated JavaScript context. In practice, that means that global objects like `Array.prototype.push` or `JSON.parse` cannot be modified by scripts running in the renderer process.

Electron uses the same technology as Chromium's [Content Scripts](https://developer.chrome.com/extensions/content_scripts#execution-environment) to enable this behavior.

Even when you use `nodeIntegration: false` to enforce strong isolation and prevent the use of Node primitives, `contextIsolation` must also be used.

### [Why?](#why)

Context isolation allows each the scripts on running in the renderer to make changes to its JavaScript environment without worrying about conflicting with the scripts in the Electron API or the preload script.

While still an experimental Electron feature, context isolation adds an additional layer of security. It creates a new JavaScript world for Electron APIs and preload scripts, which mitigates so-called "Prototype Pollution" attacks.

At the same time, preload scripts still have access to the `document` and `window` objects. In other words, you're getting a decent return on a likely very small investment.

### [How?](#how)

    // Main process
    const mainWindow = new BrowserWindow({
      webPreferences: {
        contextIsolation: true,
        preload: path.join(app.getAppPath(), 'preload.js')
      }
    })

    // Preload script
    
    // Set a variable in the page before it loads
    webFrame.executeJavaScript('window.foo = "foo";')
    
    // The loaded page will not be able to access this, it is only available
    // in this context
    window.bar = 'bar'
    
    document.addEventListener('DOMContentLoaded', () => {
      // Will log out 'undefined' since window.foo is only available in the main
      // context
      console.log(window.foo)
    
      // Will log out 'bar' since window.bar is available in this context
      console.log(window.bar)
    })

[4) Handle Session Permission Requests From Remote Content](#4-handle-session-permission-requests-from-remote-content)
----------------------------------------------------------------------------------------------------------------------

You may have seen permission requests while using Chrome: They pop up whenever the website attempts to use a feature that the user has to manually approve ( like notifications).

The API is based on the [Chromium permissions API](https://developer.chrome.com/extensions/permissions) and implements the same types of permissions.

### [Why?](#why)

By default, Electron will automatically approve all permission requests unless the developer has manually configured a custom handler. While a solid default, security-conscious developers might want to assume the very opposite.

### [How?](#how)

    const { session } = require('electron')
    
    session
      .fromPartition('some-partition')
      .setPermissionRequestHandler((webContents, permission, callback) => {
        const url = webContents.getURL()
    
        if (permission === 'notifications') {
          // Approves the permissions request
          callback(true)
        }
    
        // Verify URL
        if (!url.startsWith('https://example.com/')) {
          // Denies the permissions request
          return callback(false)
        }
      })

[5) Do Not Disable WebSecurity](#5-do-not-disable-websecurity)
--------------------------------------------------------------

_Recommendation is Electron's default_

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`](/docs/api/browser-window), [`BrowserView`](/docs/api/browser-view), or [`<webview>`](/docs/api/webview-tag)) disables crucial security features.

Do not disable `webSecurity` in production applications.

### [Why?](#why)

Disabling `webSecurity` will disable the same-origin policy and set `allowRunningInsecureContent` property to `true`. In other words, it allows the execution of insecure code from different domains.

### [How?](#how)

    // Bad
    const mainWindow = new BrowserWindow({
      webPreferences: {
        webSecurity: false
      }
    })

    // Good
    const mainWindow = new BrowserWindow()

    <!-- Bad -->
    <webview disablewebsecurity src="page.html"></webview>
    
    <!-- Good -->
    <webview src="page.html"></webview>

[6) Define a Content Security Policy](#6-define-a-content-security-policy)
--------------------------------------------------------------------------

A Content Security Policy (CSP) is an additional layer of protection against cross-site-scripting attacks and data injection attacks. We recommend that they be enabled by any website you load inside Electron.

### [Why?](#why)

CSP allows the server serving content to restrict and control the resources Electron can load for that given web page. `https://example.com` should be allowed to load scripts from the origins you defined while scripts from `https://evil.attacker.com` should not be allowed to run. Defining a CSP is an easy way to improve your application's security.

The following CSP will allow Electron to execute scripts from the current website and from `apis.example.com`.

    // Bad
    Content-Security-Policy: '*'
    
    // Good
    Content-Security-Policy: script-src 'self' https://apis.example.com

### [CSP HTTP Header](#csp-http-header)

Electron respects the [`Content-Security-Policy` HTTP header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) which can be set using Electron's [`webRequest.onHeadersReceived`](/docs/api/web-request#webrequestonheadersreceivedfilter-listener) handler:

    const { session } = require('electron')
    
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': ['default-src \'none\'']
        }
      })
    })

### [CSP Meta Tag](#csp-meta-tag)

CSP's preferred delivery mechanism is an HTTP header, however it is not possible to use this method when loading a resource using the `file://` protocol. It can be useful in some cases, such as using the `file://` protocol, to set a policy on a page directly in the markup using a `<meta>` tag:

    <meta http-equiv="Content-Security-Policy" content="default-src 'none'">

#### [`webRequest.onHeadersReceived([filter, ]listener)`](#webrequestonheadersreceivedfilter-listener)

[7) Do Not Set `allowRunningInsecureContent` to `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
----------------------------------------------------------------------------------------------------------

_Recommendation is Electron's default_

By default, Electron will not allow websites loaded over `HTTPS` to load and execute scripts, CSS, or plugins from insecure sources (`HTTP`). Setting the property `allowRunningInsecureContent` to `true` disables that protection.

Loading the initial HTML of a website over `HTTPS` and attempting to load subsequent resources via `HTTP` is also known as "mixed content".

### [Why?](#why)

Loading content over `HTTPS` assures the authenticity and integrity of the loaded resources while encrypting the traffic itself. See the section on [only displaying secure content](#1-only-load-secure-content) for more details.

### [How?](#how)

    // Bad
    const mainWindow = new BrowserWindow({
      webPreferences: {
        allowRunningInsecureContent: true
      }
    })

    // Good
    const mainWindow = new BrowserWindow({})

[8) Do Not Enable Experimental Features](#8-do-not-enable-experimental-features)
--------------------------------------------------------------------------------

_Recommendation is Electron's default_

Advanced users of Electron can enable experimental Chromium features using the `experimentalFeatures` property.

### [Why?](#why)

Experimental features are, as the name suggests, experimental and have not been enabled for all Chromium users. Furthermore, their impact on Electron as a whole has likely not been tested.

Legitimate use cases exist, but unless you know what you are doing, you should not enable this property.

### [How?](#how)

    // Bad
    const mainWindow = new BrowserWindow({
      webPreferences: {
        experimentalFeatures: true
      }
    })

    // Good
    const mainWindow = new BrowserWindow({})

[9) Do Not Use `enableBlinkFeatures`](#9-do-not-use-enableblinkfeatures)
------------------------------------------------------------------------

_Recommendation is Electron's default_

Blink is the name of the rendering engine behind Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### [Why?](#why)

Generally speaking, there are likely good reasons if a feature was not enabled by default. Legitimate use cases for enabling specific features exist. As a developer, you should know exactly why you need to enable a feature, what the ramifications are, and how it impacts the security of your application. Under no circumstances should you enable features speculatively.

### [How?](#how)

    // Bad
    const mainWindow = new BrowserWindow({
      webPreferences: {
        enableBlinkFeatures: ['ExecCommandInJavaScript']
      }
    })

    // Good
    const mainWindow = new BrowserWindow()

[10) Do Not Use `allowpopups`](#10-do-not-use-allowpopups)
----------------------------------------------------------

_Recommendation is Electron's default_

If you are using [`<webview>`](/docs/api/webview-tag), you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`](/docs/api/browser-window) using the `window.open()` method. `<webview>` tags are otherwise not allowed to create new windows.

### [Why?](#why)

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`](/docs/api/browser-window) by default. This follows the principle of minimally required access: Don't let a website create new popups unless you know it needs that feature.

### [How?](#how)

    <!-- Bad -->
    <webview allowpopups src="page.html"></webview>
    
    <!-- Good -->
    <webview src="page.html"></webview>

[11) Verify WebView Options Before Creation](#11-verify-webview-options-before-creation)
----------------------------------------------------------------------------------------

A WebView created in a renderer process that does not have Node.js integration enabled will not be able to enable integration itself. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`<webview>`](/docs/api/webview-tag) tags from the main process and to verify that their webPreferences do not disable security features.

### [Why?](#why)

Since `<webview>` live in the DOM, they can be created by a script running on your website even if Node.js integration is otherwise disabled.

Electron enables developers to disable various security features that control a renderer process. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`](/docs/api/webview-tag) tags.

### [How?](#how)

Before a [`<webview>`](/docs/api/webview-tag) tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.

    app.on('web-contents-created', (event, contents) => {
      contents.on('will-attach-webview', (event, webPreferences, params) => {
        // Strip away preload scripts if unused or verify their location is legitimate
        delete webPreferences.preload
        delete webPreferences.preloadURL
    
        // Disable Node.js integration
        webPreferences.nodeIntegration = false
    
        // Verify URL being loaded
        if (!params.src.startsWith('https://example.com/')) {
          event.preventDefault()
        }
      })
    })

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.

[12) Disable or limit navigation](#12-disable-or-limit-navigation)
------------------------------------------------------------------

If your app has no need to navigate or only needs to navigate to known pages, it is a good idea to limit navigation outright to that known scope, disallowing any other kinds of navigation.

### [Why?](#why)

Navigation is a common attack vector. If an attacker can convince your app to navigate away from its current page, they can possibly force your app to open web sites on the Internet. Even if your `webContents` are configured to be more secure (like having `nodeIntegration` disabled or `contextIsolation` enabled), getting your app to open a random web site will make the work of exploiting your app a lot easier.

A common attack pattern is that the attacker convinces your app's users to interact with the app in such a way that it navigates to one of the attacker's pages. This is usually done via links, plugins, or other user-generated content.

### [How?](#how)

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`](/docs/api/web-contents#event-will-navigate) handler. If you know which pages your app might navigate to, check the URL in the event handler and only let navigation occur if it matches the URLs you're expecting.

We recommend that you use Node's parser for URLs. Simple string comparisons can sometimes be fooled - a `startsWith('https://example.com')` test would let `https://example.com.attacker.com` through.

    const URL = require('url').URL
    
    app.on('web-contents-created', (event, contents) => {
      contents.on('will-navigate', (event, navigationUrl) => {
        const parsedUrl = new URL(navigationUrl)
    
        if (parsedUrl.origin !== 'https://example.com') {
          event.preventDefault()
        }
      })
    })

[13) Disable or limit creation of new windows](#13-disable-or-limit-creation-of-new-windows)
--------------------------------------------------------------------------------------------

If you have a known set of windows, it's a good idea to limit the creation of additional windows in your app.

### [Why?](#why)

Much like navigation, the creation of new `webContents` is a common attack vector. Attackers attempt to convince your app to create new windows, frames, or other renderer processes with more privileges than they had before; or with pages opened that they couldn't open before.

If you have no need to create windows in addition to the ones you know you'll need to create, disabling the creation buys you a little bit of extra security at no cost. This is commonly the case for apps that open one `BrowserWindow` and do not need to open an arbitrary number of additional windows at runtime.

### [How?](#how)

[`webContents`](/docs/api/web-contents) will emit the [`new-window`](/docs/api/web-contents#event-new-window) event before creating new windows. That event will be passed, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you use the event to scrutinize the creation of windows, limiting it to only what you need.

    const { shell } = require('electron')
    
    app.on('web-contents-created', (event, contents) => {
      contents.on('new-window', (event, navigationUrl) => {
        // In this example, we'll ask the operating system
        // to open this event's url in the default browser.
        event.preventDefault()
    
        shell.openExternalSync(navigationUrl)
      })
    })

[14) Do not use `openExternal` with untrusted content](#14-do-not-use-openexternal-with-untrusted-content)
----------------------------------------------------------------------------------------------------------

Shell's [`openExternal`](/docs/api/shell#shellopenexternalurl-options-callback) allows opening a given protocol URI with the desktop's native utilities. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.

### [Why?](#why)

Improper use of [`openExternal`](/docs/api/shell#shellopenexternalurl-options-callback) can be leveraged to compromise the user's host. When openExternal is used with untrusted content, it can be leveraged to execute arbitrary commands.

### [How?](#how)

    //  Bad
    const { shell } = require('electron')
    shell.openExternal(USER_CONTROLLED_DATA_HERE)

    //  Good
    const { shell } = require('electron')
    shell.openExternal('https://example.com/index.html')

[15) Disable the `remote` module](#15-disable-the-remote-module)
----------------------------------------------------------------

The `remote` module provides a way for the renderer processes to access APIs normally only available in the main process. Using it, a renderer can invoke methods of a main process object without explicitly sending inter-process messages. If your desktop application does not run untrusted content, this can be a useful way to have your renderer processes access and work with modules that are only available to the main process, such as GUI-related modules (dialogs, menus, etc.).

However, if your app can run untrusted content and even if you [sandbox](/docs/api/sandbox-option) your renderer processes accordingly, the `remote` module makes it easy for malicious code to escape the sandbox and have access to system resources via the higher privileges of the main process. Therefore, it should be disabled in such circumstances.

### [Why?](#why)

`remote` uses an internal IPC channel to communicate with the main process. "Prototype pollution" attacks can grant malicious code access to the internal IPC channel, which can then be used to escape the sandbox by mimicking `remote` IPC messages and getting access to main process modules running with higher privileges.

Additionally, it's possible for preload scripts to accidentally leak modules to a sandboxed renderer. Leaking `remote` arms malicious code with a multitude of main process modules with which to perform an attack.

Disabling the `remote` module eliminates these attack vectors. Enabling context isolation also prevents the "prototype pollution" attacks from succeeding.

### [How?](#how)

    // Bad if the renderer can run untrusted content
    const mainWindow = new BrowserWindow({})

    // Good
    const mainWindow = new BrowserWindow({
      webPreferences: {
        enableRemoteModule: false
      }
    })

    <!-- Bad if the renderer can run untrusted content  -->
    <webview src="page.html"></webview>
    
    <!-- Good -->
    <webview enableremotemodule="false" src="page.html"></webview>

[16) Filter the `remote` module](#16-filter-the-remote-module)
--------------------------------------------------------------

If you cannot disable the `remote` module, you should filter the globals, Node, and Electron modules (so-called built-ins) accessible via `remote` that your application does not require. This can be done by blocking certain modules entirely and by replacing others with proxies that expose only the functionality that your app needs.

### [Why?](#why)

Due to the system access privileges of the main process, functionality provided by the main process modules may be dangerous in the hands of malicious code running in a compromised renderer process. By limiting the set of accessible modules to the minimum that your app needs and filtering out the others, you reduce the toolset that malicious code can use to attack the system.

Note that the safest option is to [fully disable the remote module](#15-disable-the-remote-module). If you choose to filter access rather than completely disable the module, you must be very careful to ensure that no escalation of privilege is possible through the modules you allow past the filter.

### [How?](#how)

    const readOnlyFsProxy = require(/* ... */) // exposes only file read functionality
    
    const allowedModules = new Set(['crypto'])
    const proxiedModules = new Map(['fs', readOnlyFsProxy])
    const allowedElectronModules = new Set(['shell'])
    const allowedGlobals = new Set()
    
    app.on('remote-require', (event, webContents, moduleName) => {
      if (proxiedModules.has(moduleName)) {
        event.returnValue = proxiedModules.get(moduleName)
      }
      if (!allowedModules.has(moduleName)) {
        event.preventDefault()
      }
    })
    
    app.on('remote-get-builtin', (event, webContents, moduleName) => {
      if (!allowedElectronModules.has(moduleName)) {
        event.preventDefault()
      }
    })
    
    app.on('remote-get-global', (event, webContents, globalName) => {
      if (!allowedGlobals.has(globalName)) {
        event.preventDefault()
      }
    })
    
    app.on('remote-get-current-window', (event, webContents) => {
      event.preventDefault()
    })
    
    app.on('remote-get-current-web-contents', (event, webContents) => {
      event.preventDefault()
    })
    
    app.on('remote-get-guest-web-contents', (event, webContents, guestWebContents) => {
      event.preventDefault()
    })

* * *

[SegmentedControlSegment Object](#segmentedcontrolsegment-object)
=================================================================

*   `label` String (optional) - The text to appear in this segment.
*   `icon` NativeImage (optional) - The image to appear in this segment.
*   `enabled` Boolean (optional) - Whether this segment is selectable. Default: true.

* * *

[session](#session)
===================

> Manage browser sessions, cookies, cache, proxy settings, etc.

Process: [Main](/docs/glossary#main-process)

The `session` module can be used to create new `Session` objects.

You can also access the `session` of existing pages by using the `session` property of [`WebContents`](/docs/api/web-contents), or from the `session` module.

    const { BrowserWindow } = require('electron')
    
    let win = new BrowserWindow({ width: 800, height: 600 })
    win.loadURL('http://github.com')
    
    const ses = win.webContents.session
    console.log(ses.getUserAgent())

[Methods](#methods)
-------------------

The `session` module has the following methods:

### [`session.fromPartition(partition[, options])`](#sessionfrompartitionpartition-options)

*   `partition` String
*   `options` Object (optional)
    
    *   `cache` Boolean - Whether to enable cache.

Returns `Session` - A session instance from `partition` string. When there is an existing `Session` with the same `partition`, it will be returned; otherwise a new `Session` instance will be created with `options`.

If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. If the `partition` is empty then default session of the app will be returned.

To create a `Session` with `options`, you have to ensure the `Session` with the `partition` has never been used before. There is no way to change the `options` of an existing `Session` object.

[Properties](#properties)
-------------------------

The `session` module has the following properties:

### [`session.defaultSession`](#sessiondefaultsession)

A `Session` object, the default session object of the app.

[Class: Session](#class-session)
--------------------------------

> Get and set properties of a session.

Process: [Main](/docs/glossary#main-process)

You can create a `Session` object in the `session` module:

    const { session } = require('electron')
    const ses = session.fromPartition('persist:name')
    console.log(ses.getUserAgent())

### [Instance Events](#instance-events)

The following events are available on instances of `Session`:

#### [Event: 'will-download'](#event-will-download)

*   `event` Event
*   `item` [DownloadItem](/docs/api/download-item)
*   `webContents` [WebContents](/docs/api/web-contents)

Emitted when Electron is about to download `item` in `webContents`.

Calling `event.preventDefault()` will cancel the download and `item` will not be available from next tick of the process.

    const { session } = require('electron')
    session.defaultSession.on('will-download', (event, item, webContents) => {
      event.preventDefault()
      require('request')(item.getURL(), (data) => {
        require('fs').writeFileSync('/somewhere', data)
      })
    })

### [Instance Methods](#instance-methods)

The following methods are available on instances of `Session`:

#### [`ses.getCacheSize(callback)`](#sesgetcachesizecallback)

*   `callback` Function
    
    *   `size` Integer - Cache size used in bytes.

Callback is invoked with the session's current cache size.

#### [`ses.clearCache(callback)`](#sesclearcachecallback)

*   `callback` Function - Called when operation is done.

Clears the session’s HTTP cache.

#### [`ses.clearStorageData([options, callback])`](#sesclearstoragedataoptions-callback)

*   `options` Object (optional)
    
    *   `origin` String (optional) - Should follow `window.location.origin`’s representation `scheme://host:port`.
    *   `storages` String[](/docs/api/optional) - The types of storages to clear, can contain: `appcache`, `cookies`, `filesystem`, `indexdb`, `localstorage`, `shadercache`, `websql`, `serviceworkers`, `cachestorage`.
    *   `quotas` String[](/docs/api/optional) - The types of quotas to clear, can contain: `temporary`, `persistent`, `syncable`.
*   `callback` Function (optional) - Called when operation is done.

Clears the data of web storages.

#### [`ses.flushStorageData()`](#sesflushstoragedata)

Writes any unwritten DOMStorage data to disk.

#### [`ses.setProxy(config, callback)`](#sessetproxyconfig-callback)

*   `config` Object
    
    *   `pacScript` String - The URL associated with the PAC file.
    *   `proxyRules` String - Rules indicating which proxies to use.
    *   `proxyBypassRules` String - Rules indicating which URLs should bypass the proxy settings.
*   `callback` Function - Called when operation is done.

Sets the proxy settings.

When `pacScript` and `proxyRules` are provided together, the `proxyRules` option is ignored and `pacScript` configuration is applied.

The `proxyRules` has to follow the rules below:

    proxyRules = schemeProxies[";"<schemeProxies>]
    schemeProxies = [<urlScheme>"="]<proxyURIList>
    urlScheme = "http" | "https" | "ftp" | "socks"
    proxyURIList = <proxyURL>[","<proxyURIList>]
    proxyURL = [<proxyScheme>"://"]<proxyHost>[":"<proxyPort>]

For example:

*   `http=foopy:80;ftp=foopy2` - Use HTTP proxy `foopy:80` for `http://` URLs, and HTTP proxy `foopy2:80` for `ftp://` URLs.
*   `foopy:80` - Use HTTP proxy `foopy:80` for all URLs.
*   `foopy:80,bar,direct://` - Use HTTP proxy `foopy:80` for all URLs, failing over to `bar` if `foopy:80` is unavailable, and after that using no proxy.
*   `socks4://foopy` - Use SOCKS v4 proxy `foopy:1080` for all URLs.
*   `http=foopy,socks5://bar.com` - Use HTTP proxy `foopy` for http URLs, and fail over to the SOCKS5 proxy `bar.com` if `foopy` is unavailable.
*   `http=foopy,direct://` - Use HTTP proxy `foopy` for http URLs, and use no proxy if `foopy` is unavailable.
*   `http=foopy;socks=foopy2` - Use HTTP proxy `foopy` for http URLs, and use `socks4://foopy2` for all other URLs.

The `proxyBypassRules` is a comma separated list of rules described below:

*   `[ URL_SCHEME "://" ] HOSTNAME_PATTERN [ ":" <port> ]`
    
    Match all hostnames that match the pattern HOSTNAME\_PATTERN.
    
    Examples: "foobar.com", "_foobar.com", "_.foobar.com", "_foobar.com:99", "[https://x](https://x)._.y.com:99"
    
*   `"." HOSTNAME_SUFFIX_PATTERN [ ":" PORT ]`
    
    Match a particular domain suffix.
    
    Examples: ".google.com", ".com", "[http://.google.com](http://.google.com)"
    
*   `[ SCHEME "://" ] IP_LITERAL [ ":" PORT ]`
    
    Match URLs which are IP address literals.
    
    Examples: "127.0.1", "\[0:0::1\]", "\[::1\]", "[http://\[::1\]:99](http://%5B::1%5D:99)"
    
*   `IP_LITERAL "/" PREFIX_LENGTH_IN_BITS`
    
    Match any URL that is to an IP literal that falls between the given range. IP range is specified using CIDR notation.
    
    Examples: "192.168.1.1/16", "fefe:13::abc/33".
    
*   `<local>`
    
    Match local addresses. The meaning of `<local>` is whether the host matches one of: "127.0.0.1", "::1", "localhost".
    

#### [`ses.resolveProxy(url, callback)`](#sesresolveproxyurl-callback)

*   `url` URL
*   `callback` Function
    
    *   `proxy` String

Resolves the proxy information for `url`. The `callback` will be called with `callback(proxy)` when the request is performed.

#### [`ses.setDownloadPath(path)`](#sessetdownloadpathpath)

*   `path` String - The download location.

Sets download saving directory. By default, the download directory will be the `Downloads` under the respective app folder.

#### [`ses.enableNetworkEmulation(options)`](#sesenablenetworkemulationoptions)

*   `options` Object
    
    *   `offline` Boolean (optional) - Whether to emulate network outage. Defaults to false.
    *   `latency` Double (optional) - RTT in ms. Defaults to 0 which will disable latency throttling.
    *   `downloadThroughput` Double (optional) - Download rate in Bps. Defaults to 0 which will disable download throttling.
    *   `uploadThroughput` Double (optional) - Upload rate in Bps. Defaults to 0 which will disable upload throttling.

Emulates network with the given configuration for the `session`.

    // To emulate a GPRS connection with 50kbps throughput and 500 ms latency.
    window.webContents.session.enableNetworkEmulation({
      latency: 500,
      downloadThroughput: 6400,
      uploadThroughput: 6400
    })
    
    // To emulate a network outage.
    window.webContents.session.enableNetworkEmulation({ offline: true })

#### [`ses.disableNetworkEmulation()`](#sesdisablenetworkemulation)

Disables any network emulation already active for the `session`. Resets to the original network configuration.

#### [`ses.setCertificateVerifyProc(proc)`](#sessetcertificateverifyprocproc)

*   `proc` Function
    
    *   `request` Object
        
        *   `hostname` String
        *   `certificate` [Certificate](/docs/api/structures/certificate)
        *   `verificationResult` String - Verification result from chromium.
        *   `errorCode` Integer - Error code.
    *   `callback` Function
        
        *   `verificationResult` Integer - Value can be one of certificate error codes from [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h). Apart from the certificate error codes, the following special codes can be used.
            
            *   `0` - Indicates success and disables Certificate Transparency verification.
            *   `-2` - Indicates failure.
            *   `-3` - Uses the verification result from chromium.

Sets the certificate verify proc for `session`, the `proc` will be called with `proc(request, callback)` whenever a server certificate verification is requested. Calling `callback(0)` accepts the certificate, calling `callback(-2)` rejects it.

Calling `setCertificateVerifyProc(null)` will revert back to default certificate verify proc.

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow()
    
    win.webContents.session.setCertificateVerifyProc((request, callback) => {
      const { hostname } = request
      if (hostname === 'github.com') {
        callback(0)
      } else {
        callback(-2)
      }
    })

#### [`ses.setPermissionRequestHandler(handler)`](#sessetpermissionrequesthandlerhandler)

*   `handler` Function | null
    
    *   `webContents` [WebContents](/docs/api/web-contents) - WebContents requesting the permission.
    *   `permission` String - Enum of 'media', 'geolocation', 'notifications', 'midiSysex', 'pointerLock', 'fullscreen', 'openExternal'.
    *   `callback` Function
        
        *   `permissionGranted` Boolean - Allow or deny the permission.
    *   `details` Object - Some properties are only available on certain permission types.
        
        *   `externalURL` String - The url of the `openExternal` request.
        *   `mediaTypes` String\[\] - The types of media access being requested, elements can be `video` or `audio`

Sets the handler which can be used to respond to permission requests for the `session`. Calling `callback(true)` will allow the permission and `callback(false)` will reject it. To clear the handler, call `setPermissionRequestHandler(null)`.

    const { session } = require('electron')
    session.fromPartition('some-partition').setPermissionRequestHandler((webContents, permission, callback) => {
      if (webContents.getURL() === 'some-host' && permission === 'notifications') {
        return callback(false) // denied.
      }
    
      callback(true)
    })

#### [`ses.setPermissionCheckHandler(handler)`](#sessetpermissioncheckhandlerhandler)

*   `handler` Function | null
    
    *   `webContents` [WebContents](/docs/api/web-contents) - WebContents checking the permission.
    *   `permission` String - Enum of 'media'.
    *   `requestingOrigin` String - The origin URL of the permission check
    *   `details` Object - Some properties are only available on certain permission types.
        
        *   `securityOrigin` String - The security orign of the `media` check.
        *   `mediaType` String - The type of media access being requested, can be `video`, `audio` or `unknown`

Sets the handler which can be used to respond to permission checks for the `session`. Returning `true` will allow the permission and `false` will reject it. To clear the handler, call `setPermissionCheckHandler(null)`.

    const { session } = require('electron')
    session.fromPartition('some-partition').setPermissionCheckHandler((webContents, permission) => {
      if (webContents.getURL() === 'some-host' && permission === 'notifications') {
        return false // denied
      }
    
      return true
    })

#### [`ses.clearHostResolverCache([callback])`](#sesclearhostresolvercachecallback)

*   `callback` Function (optional) - Called when operation is done.

Clears the host resolver cache.

#### [`ses.allowNTLMCredentialsForDomains(domains)`](#sesallowntlmcredentialsfordomainsdomains)

*   `domains` String - A comma-separated list of servers for which integrated authentication is enabled.

Dynamically sets whether to always send credentials for HTTP NTLM or Negotiate authentication.

    const { session } = require('electron')
    // consider any url ending with `example.com`, `foobar.com`, `baz`
    // for integrated authentication.
    session.defaultSession.allowNTLMCredentialsForDomains('*example.com, *foobar.com, *baz')
    
    // consider all urls for integrated authentication.
    session.defaultSession.allowNTLMCredentialsForDomains('*')

#### [`ses.setUserAgent(userAgent[, acceptLanguages])`](#sessetuseragentuseragent-acceptlanguages)

*   `userAgent` String
*   `acceptLanguages` String (optional)

Overrides the `userAgent` and `acceptLanguages` for this session.

The `acceptLanguages` must a comma separated ordered list of language codes, for example `"en-US,fr,de,ko,zh-CN,ja"`.

This doesn't affect existing `WebContents`, and each `WebContents` can use `webContents.setUserAgent` to override the session-wide user agent.

#### [`ses.getUserAgent()`](#sesgetuseragent)

Returns `String` - The user agent for this session.

#### [`ses.getBlobData(identifier, callback)`](#sesgetblobdataidentifier-callback)

*   `identifier` String - Valid UUID.
*   `callback` Function
    
    *   `result` Buffer - Blob data.

#### [`ses.createInterruptedDownload(options)`](#sescreateinterrupteddownloadoptions)

*   `options` Object
    
    *   `path` String - Absolute path of the download.
    *   `urlChain` String\[\] - Complete URL chain for the download.
    *   `mimeType` String (optional)
    *   `offset` Integer - Start range for the download.
    *   `length` Integer - Total length of the download.
    *   `lastModified` String - Last-Modified header value.
    *   `eTag` String - ETag header value.
    *   `startTime` Double (optional) - Time when download was started in number of seconds since UNIX epoch.

Allows resuming `cancelled` or `interrupted` downloads from previous `Session`. The API will generate a [DownloadItem](/docs/api/download-item) that can be accessed with the [will-download](#event-will-download) event. The [DownloadItem](/docs/api/download-item) will not have any `WebContents` associated with it and the initial state will be `interrupted`. The download will start only when the `resume` API is called on the [DownloadItem](/docs/api/download-item).

#### [`ses.clearAuthCache(options[, callback])`](#sesclearauthcacheoptions-callback)

*   `options` ([RemovePassword](/docs/api/structures/remove-password) | [RemoveClientCertificate](/docs/api/structures/remove-client-certificate))
*   `callback` Function (optional) - Called when operation is done.

Clears the session’s HTTP authentication cache.

#### [`ses.setPreloads(preloads)`](#sessetpreloadspreloads)

*   `preloads` String\[\] - An array of absolute path to preload scripts

Adds scripts that will be executed on ALL web contents that are associated with this session just before normal `preload` scripts run.

#### [`ses.getPreloads()`](#sesgetpreloads)

Returns `String[]` an array of paths to preload scripts that have been registered.

### [Instance Properties](#instance-properties)

The following properties are available on instances of `Session`:

#### [`ses.cookies`](#sescookies)

A [Cookies](/docs/api/cookies) object for this session.

#### [`ses.webRequest`](#seswebrequest)

A [WebRequest](/docs/api/web-request) object for this session.

#### [`ses.protocol`](#sesprotocol)

A [Protocol](/docs/api/protocol) object for this session.

    const { app, session } = require('electron')
    const path = require('path')
    
    app.on('ready', function () {
      const protocol = session.fromPartition('some-partition').protocol
      protocol.registerFileProtocol('atom', function (request, callback) {
        var url = request.url.substr(7)
        callback({ path: path.normalize(`${__dirname}/${url}`) })
      }, function (error) {
        if (error) console.error('Failed to register protocol')
      })
    })

#### [`ses.netLog`](#sesnetlog)

A [NetLog](/docs/api/net-log) object for this session.

    const { app, session } = require('electron')
    
    app.on('ready', function () {
      const netLog = session.fromPartition('some-partition').netLog
      netLog.startLogging('/path/to/net-log')
      // After some network events
      netLog.stopLogging(path => {
        console.log('Net-logs written to', path)
      })
    })

* * *

[Setting Up Symbol Server in Debugger](#setting-up-symbol-server-in-debugger)
=============================================================================

Debug symbols allow you to have better debugging sessions. They have information about the functions contained in executables and dynamic libraries and provide you with information to get clean call stacks. A Symbol Server allows the debugger to load the correct symbols, binaries and sources automatically without forcing users to download large debugging files. The server functions like [Microsoft's symbol server](https://support.microsoft.com/kb/311503) so the documentation there can be useful.

Note that because released Electron builds are heavily optimized, debugging is not always easy. The debugger will not be able to show you the content of all variables and the execution path can seem strange because of inlining, tail calls, and other compiler optimizations. The only workaround is to build an unoptimized local build.

The official symbol server URL for Electron is [https://electron-symbols.githubapp.com](https://electron-symbols.githubapp.com). You cannot visit this URL directly, you must add it to the symbol path of your debugging tool. In the examples below, a local cache directory is used to avoid repeatedly fetching the PDB from the server. Replace `c:\code\symbols` with an appropriate cache directory on your machine.

[Using the Symbol Server in Windbg](#using-the-symbol-server-in-windbg)
-----------------------------------------------------------------------

The Windbg symbol path is configured with a string value delimited with asterisk characters. To use only the Electron symbol server, add the following entry to your symbol path (**Note:** you can replace `c:\code\symbols` with any writable directory on your computer, if you'd prefer a different location for downloaded symbols):

    SRV*c:\code\symbols\*https://electron-symbols.githubapp.com

Set this string as `_NT_SYMBOL_PATH` in the environment, using the Windbg menus, or by typing the `.sympath` command. If you would like to get symbols from Microsoft's symbol server as well, you should list that first:

    SRV*c:\code\symbols\*https://msdl.microsoft.com/download/symbols;SRV*c:\code\symbols\*https://electron-symbols.githubapp.com

[Using the symbol server in Visual Studio](#using-the-symbol-server-in-visual-studio)
-------------------------------------------------------------------------------------

![](https://mdn.mozillademos.org/files/733/symbol-server-vc8express-menu.jpg) ![](https://mdn.mozillademos.org/files/2497/2005_options.gif)

[Troubleshooting: Symbols will not load](#troubleshooting-symbols-will-not-load)
--------------------------------------------------------------------------------

Type the following commands in Windbg to print why symbols are not loading:

    > !sym noisy
    > .reload /f electron.exe

* * *

[shell](#shell)
===============

> Manage files and URLs using their default applications.

Process: [Main](/docs/glossary#main-process), [Renderer](/docs/glossary#renderer-process)

The `shell` module provides functions related to desktop integration.

An example of opening a URL in the user's default browser:

    const { shell } = require('electron')
    
    shell.openExternal('https://github.com')

[Methods](#methods)
-------------------

The `shell` module has the following methods:

### [`shell.showItemInFolder(fullPath)`](#shellshowiteminfolderfullpath)

*   `fullPath` String

Returns `Boolean` - Whether the item was successfully shown.

Show the given file in a file manager. If possible, select the file.

### [`shell.openItem(fullPath)`](#shellopenitemfullpath)

*   `fullPath` String

Returns `Boolean` - Whether the item was successfully opened.

Open the given file in the desktop's default manner.

### [`shell.openExternal(url[, options, callback])`](#shellopenexternalurl-options-callback)

*   `url` String - Max 2081 characters on windows, or the function returns false.
*   `options` Object (optional)
    
    *   `activate` Boolean (optional) - `true` to bring the opened application to the foreground. The default is `true`. _macOS_
    *   `workingDirectory` String (optional) - The working directory. _Windows_
*   `callback` Function (optional) _macOS_ - If specified will perform the open asynchronously.
    
    *   `error` Error

Returns `Boolean` - Whether an application was available to open the URL. If callback is specified, always returns true.

Open the given external protocol URL in the desktop's default manner. (For example, mailto: URLs in the user's default mail agent).

### [`shell.moveItemToTrash(fullPath)`](#shellmoveitemtotrashfullpath)

*   `fullPath` String

Returns `Boolean` - Whether the item was successfully moved to the trash.

Move the given file to trash and returns a boolean status for the operation.

### [`shell.beep()`](#shellbeep)

Play the beep sound.

### [`shell.writeShortcutLink(shortcutPath[, operation], options)` _Windows_](#shellwriteshortcutlinkshortcutpath-operation-options-windows)

*   `shortcutPath` String
*   `operation` String (optional) - Default is `create`, can be one of following:
    
    *   `create` - Creates a new shortcut, overwriting if necessary.
    *   `update` - Updates specified properties only on an existing shortcut.
    *   `replace` - Overwrites an existing shortcut, fails if the shortcut doesn't exist.
*   `options` [ShortcutDetails](/docs/api/structures/shortcut-details)

Returns `Boolean` - Whether the shortcut was created successfully.

Creates or updates a shortcut link at `shortcutPath`.

### [`shell.readShortcutLink(shortcutPath)` _Windows_](#shellreadshortcutlinkshortcutpath-windows)

*   `shortcutPath` String

Returns [`ShortcutDetails`](/docs/api/structures/shortcut-details)

Resolves the shortcut link at `shortcutPath`.

An exception will be thrown when any error happens.

* * *

[ShortcutDetails Object](#shortcutdetails-object)
=================================================

*   `target` String - The target to launch from this shortcut.
*   `cwd` String (optional) - The working directory. Default is empty.
*   `args` String (optional) - The arguments to be applied to `target` when launching from this shortcut. Default is empty.
*   `description` String (optional) - The description of the shortcut. Default is empty.
*   `icon` String (optional) - The path to the icon, can be a DLL or EXE. `icon` and `iconIndex` have to be set together. Default is empty, which uses the target's icon.
*   `iconIndex` Number (optional) - The resource ID of icon when `icon` is a DLL or EXE. Default is 0.
*   `appUserModelId` String (optional) - The Application User Model ID. Default is empty.

* * *

[Size Object](#size-object)
===========================

*   `width` Number
*   `height` Number

* * *

[Snapcraft Guide (Ubuntu Software Center & More)](#snapcraft-guide-ubuntu-software-center--more)
================================================================================================

This guide provides information on how to package your Electron application for any Snapcraft environment, including the Ubuntu Software Center.

[Background and Requirements](#background-and-requirements)
-----------------------------------------------------------

Together with the broader Linux community, Canonical aims to fix many of the common software installation problems with the [`snapcraft`](https://snapcraft.io/) project. Snaps are containerized software packages that include required dependencies, auto-update, and work on all major Linux distributions without system modification.

There are three ways to create a `.snap` file:

1) Using [`electron-forge`](https://github.com/electron-userland/electron-forge) or [`electron-builder`](https://github.com/electron-userland/electron-builder), both tools that come with `snap` support out of the box. This is the easiest option. 2) Using `electron-installer-snap`, which takes `electron-packager`'s output. 3) Using an already created `.deb` package.

In all cases, you will need to have the `snapcraft` tool installed. We recommend building on Ubuntu 16.04 (or the current LTS).

    snap install snapcraft --classic

While it _is possible_ to install `snapcraft` on macOS using Homebrew, it is not able to build `snap` packages and is focused on managing packages in the store.

[Using `electron-installer-snap`](#using-electron-installer-snap)
-----------------------------------------------------------------

The module works like [`electron-winstaller`](https://github.com/electron/windows-installer) and similar modules in that its scope is limited to building snap packages. You can install it with:

    npm install --save-dev electron-installer-snap

### [Step 1: Package Your Electron Application](#step-1-package-your-electron-application)

Package the application using [electron-packager](https://github.com/electron-userland/electron-packager) (or a similar tool). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

The output should look roughly like this:

    .
    └── dist
        └── app-linux-x64
            ├── LICENSE
            ├── LICENSES.chromium.html
            ├── content_shell.pak
            ├── app
            ├── icudtl.dat
            ├── libgcrypt.so.11
            ├── libnode.so
            ├── locales
            ├── natives_blob.bin
            ├── resources
            ├── v8_context_snapshot.bin
            └── version

### [Step 2: Running `electron-installer-snap`](#step-2-running-electron-installer-snap)

From a terminal that has `snapcraft` in its `PATH`, run `electron-installer-snap` with the only required parameter `--src`, which is the location of your packaged Electron application created in the first step.

    npx electron-installer-snap --src=out/myappname-linux-x64

If you have an existing build pipeline, you can use `electron-installer-snap` programmatically. For more information, see the [Snapcraft API docs](https://docs.snapcraft.io/build-snaps/syntax).

    const snap = require('electron-installer-snap')
    
    snap(options)
      .then(snapPath => console.log(`Created snap at ${snapPath}!`))

[Using an Existing Debian Package](#using-an-existing-debian-package)
---------------------------------------------------------------------

Snapcraft is capable of taking an existing `.deb` file and turning it into a `.snap` file. The creation of a snap is configured using a `snapcraft.yaml` file that describes the sources, dependencies, description, and other core building blocks.

### [Step 1: Create a Debian Package](#step-1-create-a-debian-package)

If you do not already have a `.deb` package, using `electron-installer-snap` might be an easier path to create snap packages. However, multiple solutions for creating Debian packages exist, including [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) or [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### [Step 2: Create a snapcraft.yaml](#step-2-create-a-snapcraftyaml)

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

    name: myApp
    version: '2.0.0'
    summary: A little description for the app.
    description: |
     You know what? This app is amazing! It does all the things
     for you. Some say it keeps you young, maybe even happy.
    
    grade: stable
    confinement: classic
    
    parts:
      slack:
        plugin: dump
        source: my-deb.deb
        source-type: deb
        after:
          - desktop-gtk3
        stage-packages:
          - libasound2
          - libgconf2-4
          - libnotify4
          - libnspr4
          - libnss3
          - libpcre3
          - libpulse0
          - libxss1
          - libxtst6
      electron-launch:
        plugin: dump
        source: files/
        prepare: |
          chmod +x bin/electron-launch
    
    apps:
      myApp:
        command: bin/electron-launch $SNAP/usr/lib/myApp/myApp
        desktop: usr/share/applications/myApp.desktop
        # Correct the TMPDIR path for Chromium Framework/Electron to ensure
        # libappindicator has readable resources.
        environment:
          TMPDIR: $XDG_RUNTIME_DIR

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

    #!/bin/sh
    
    exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &

Alternatively, if you're building your `snap` with `strict` confinement, you can use the `desktop-launch` command:

    apps:
      myApp:
        # Correct the TMPDIR path for Chromium Framework/Electron to ensure
        # libappindicator has readable resources.
        command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
        desktop: usr/share/applications/desktop.desktop

* * *

[Source Code Directory Structure](#source-code-directory-structure)
===================================================================

The source code of Electron is separated into a few parts, mostly following Chromium on the separation conventions.

You may need to become familiar with [Chromium's multi-process architecture](https://dev.chromium.org/developers/design-documents/multi-process-architecture) to understand the source code better.

[Structure of Source Code](#structure-of-source-code)
-----------------------------------------------------

    Electron
    ├── atom/ - C++ source code.
    |   ├── app/ - System entry code.
    |   ├── browser/ - The frontend including the main window, UI, and all of the
    |   |   |          main process things. This talks to the renderer to manage web
    |   |   |          pages.
    |   |   ├── ui/ - Implementation of UI stuff for different platforms.
    |   |   |   ├── cocoa/ - Cocoa specific source code.
    |   |   |   ├── win/ - Windows GUI specific source code.
    |   |   |   └── x/ - X11 specific source code.
    |   |   ├── api/ - The implementation of the main process APIs.
    |   |   ├── net/ - Network related code.
    |   |   ├── mac/ - Mac specific Objective-C source code.
    |   |   └── resources/ - Icons, platform-dependent files, etc.
    |   ├── renderer/ - Code that runs in renderer process.
    |   |   └── api/ - The implementation of renderer process APIs.
    |   └── common/ - Code that used by both the main and renderer processes,
    |       |         including some utility functions and code to integrate node's
    |       |         message loop into Chromium's message loop.
    |       └── api/ - The implementation of common APIs, and foundations of
    |                  Electron's built-in modules.
    ├── chromium_src/ - Source code copied from Chromium. See below.
    ├── default_app/ - The default page to show when Electron is started without
    |                  providing an app.
    ├── docs/ - Documentations.
    ├── lib/ - JavaScript source code.
    |   ├── browser/ - Javascript main process initialization code.
    |   |   └── api/ - Javascript API implementation.
    |   ├── common/ - JavaScript used by both the main and renderer processes
    |   |   └── api/ - Javascript API implementation.
    |   └── renderer/ - Javascript renderer process initialization code.
    |       └── api/ - Javascript API implementation.
    ├── native_mate/ - A fork of Chromium's gin library that makes it easier to marshal
    |                  types between C++ and JavaScript.
    ├── spec/ - Automatic tests.
    └── BUILD.gn - Building rules of Electron.

[`/chromium_src`](#chromium_src)
--------------------------------

The files in `/chromium_src` tend to be pieces of Chromium that aren't part of the content layer. For example to implement Pepper API, we need some wiring similar to what official Chrome does. We could have built the relevant sources as a part of [libcc](/docs/glossary#libchromiumcontent) but most often we don't require all the features (some tend to be proprietary, analytics stuff) so we took parts of the code. These could have easily been patches in libcc, but at the time when these were written the goal of libcc was to maintain very minimal patches and chromium\_src changes tend to be big ones. Also, note that these patches can never be upstreamed unlike other libcc patches we maintain now.

[Structure of Other Directories](#structure-of-other-directories)
-----------------------------------------------------------------

*   **script** - Scripts used for development purpose like building, packaging, testing, etc.
*   **tools** - Helper scripts used by GN files, unlike `script`, scripts put here should never be invoked by users directly.
*   **vendor** - Source code of third party dependencies, we didn't use `third_party` as name because it would confuse it with the same directory in Chromium's source code tree.
*   **node\_modules** - Third party node modules used for building.
*   **out** - Temporary output directory of `ninja`.
*   **dist** - Temporary directory created by `script/create-dist.py` script when creating a distribution.
*   **external\_binaries** - Downloaded binaries of third-party frameworks which do not support building with `gn`.

[Keeping Git Submodules Up to Date](#keeping-git-submodules-up-to-date)
-----------------------------------------------------------------------

The Electron repository has a few vendored dependencies, found in the [/vendor](https://github.com/electron/electron/tree/master/vendor) directory. Occasionally you might see a message like this when running `git status`:

    $ git status
    
    	modified:   vendor/depot_tools (new commits)
    	modified:   vendor/boto (new commits)

To update these vendored dependencies, run the following command:

    git submodule update --init --recursive

If you find yourself running this command often, you can create an alias for it in your `~/.gitconfig` file:

    [alias]
    	su = submodule update --init --recursive

* * *

[StreamProtocolResponse Object](#streamprotocolresponse-object)
===============================================================

*   `statusCode` Number - The HTTP response code.
*   `headers` Object - An object containing the response headers.
*   `data` ReadableStream - A Node.js readable stream representing the response body.

* * *

[Electron Documentation Styleguide](#electron-documentation-styleguide)
=======================================================================

These are the guidelines for writing Electron documentation.

[Titles](#titles)
-----------------

*   Each page must have a single `#`\-level title at the top.
*   Chapters in the same page must have `##`\-level titles.
*   Sub-chapters need to increase the number of `#` in the title according to their nesting depth.
*   All words in the page's title must be capitalized, except for conjunctions like "of" and "and" .
*   Only the first word of a chapter title must be capitalized.

Using `Quick Start` as example:

    # Quick Start
    
    ...
    
    ## Main process
    
    ...
    
    ## Renderer process
    
    ...
    
    ## Run your app
    
    ...
    
    ### Run as a distribution
    
    ...
    
    ### Manually downloaded Electron binary
    
    ...

For API references, there are exceptions to this rule.

[Markdown rules](#markdown-rules)
---------------------------------

*   Use `sh` instead of `cmd` in code blocks (due to the syntax highlighter).
*   Lines should be wrapped at 80 columns.
*   No nesting lists more than 2 levels (due to the markdown renderer).
*   All `js` and `javascript` code blocks are linted with [standard-markdown](http://npm.im/standard-markdown).

[Picking words](#picking-words)
-------------------------------

*   Use "will" over "would" when describing outcomes.
*   Prefer "in the \_\_\_ process" over "on".

[API references](#api-references)
---------------------------------

The following rules only apply to the documentation of APIs.

### [Page title](#page-title)

Each page must use the actual object name returned by `require('electron')` as the title, such as `BrowserWindow`, `autoUpdater`, and `session`.

Under the page title must be a one-line description starting with `>`.

Using `session` as example:

    # session
    
    > Manage browser sessions, cookies, cache, proxy settings, etc.

### [Module methods and events](#module-methods-and-events)

For modules that are not classes, their methods and events must be listed under the `## Methods` and `## Events` chapters.

Using `autoUpdater` as an example:

    # autoUpdater
    
    ## Events
    
    ### Event: 'error'
    
    ## Methods
    
    ### `autoUpdater.setFeedURL(url[, requestHeaders])`

### [Classes](#classes)

*   API classes or classes that are part of modules must be listed under a `## Class: TheClassName` chapter.
*   One page can have multiple classes.
*   Constructors must be listed with `###`\-level titles.
*   [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
*   [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
*   All methods that have a return value must start their description with "Returns `[TYPE]` - Return description"
    
    *   If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
*   Instance Events must be listed under an `### Instance Events` chapter.
*   Instance Properties must be listed under an `### Instance Properties` chapter.
    
    *   Instance properties must start with "A \[Property Type\] ..."

Using the `Session` and `Cookies` classes as an example:

    # session
    
    ## Methods
    
    ### session.fromPartition(partition)
    
    ## Properties
    
    ### session.defaultSession
    
    ## Class: Session
    
    ### Instance Events
    
    #### Event: 'will-download'
    
    ### Instance Methods
    
    #### `ses.getCacheSize()`
    
    ### Instance Properties
    
    #### `ses.cookies`
    
    ## Class: Cookies
    
    ### Instance Methods
    
    #### `cookies.get(filter, callback)`

### [Methods](#methods)

The methods chapter must be in the following form:

    ### `objectName.methodName(required[, optional]))`
    
    * `required` String - A parameter description.
    * `optional` Integer (optional) - Another parameter description.
    
    ...

The title can be `###` or `####`\-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

    required[, optional]

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

*   [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
*   [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
*   [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
*   [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
*   [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
*   Or a custom type like Electron's [`WebContent`](/docs/api/web-contents)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows` or `Linux`.

    * `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### [Events](#events)

The events chapter must be in following form:

    ### Event: 'wake-up'
    
    Returns:
    
    * `time` String
    
    ...

The title can be `###` or `####`\-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### [Properties](#properties)

The properties chapter must be in following form:

    ### session.defaultSession
    
    ...

The title can be `###` or `####`\-levels depending on whether it is a property of a module or a class.

[Documentation Translations](#documentation-translations)
---------------------------------------------------------

See [electron/i18n](https://github.com/electron/i18n#readme)

* * *

[Electron Support](#electron-support)
=====================================

[Finding Support](#finding-support)
-----------------------------------

If you have a security concern, please see the [security document](/SECURITY).

If you're looking for programming help, for answers to questions, or to join in discussion with other developers who use Electron, you can interact with the community in these locations:

*   [`electron`](https://discuss.atom.io/c/electron) category on the Atom forums
*   `#atom-shell` channel on Freenode
*   [`Electron`](https://atom-slack.herokuapp.com) channel on Atom's Slack
*   [`electron-ru`](https://telegram.me/electron_ru) _(Russian)_
*   [`electron-br`](https://electron-br.slack.com) _(Brazilian Portuguese)_
*   [`electron-kr`](https://electron-kr.github.io/electron-kr) _(Korean)_
*   [`electron-jp`](https://electron-jp.slack.com) _(Japanese)_
*   [`electron-tr`](https://electron-tr.herokuapp.com) _(Turkish)_
*   [`electron-id`](https://electron-id.slack.com) _(Indonesia)_
*   [`electron-pl`](https://electronpl.github.io) _(Poland)_

If you'd like to contribute to Electron, see the [contributing document](/CONTRIBUTING).

If you've found a bug in a [supported version](#supported-versions) of Electron, please report it with the [issue tracker](/docs/development/issues).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) is a community-maintained list of useful example apps, tools and resources.

[Supported Versions](#supported-versions)
-----------------------------------------

The latest three release branches are supported by the Electron team. For example, if the latest release is 2.0.x, then the 2-0-x series is supported, as are the two previous release series 1-7-x and 1-8-x.

When a release branch reaches the end of its support cycle, the series will be deprecated in NPM and a final end-of-support release will be made. This release will add a warning to inform that an unsupported version of Electron is in use.

These steps are to help app developers learn when a branch they're using becomes unsupported, but without being excessively intrusive to end users.

If an application has exceptional circumstances and needs to stay on an unsupported series of Electron, developers can silence the end-of-support warning by omitting the final release from the app's `package.json` `devDependencies`. For example, since the 1-6-x series ended with an end-of-support 1.6.18 release, developers could choose to stay in the 1-6-x series without warnings with `devDependency` of `"electron": 1.6.0 - 1.6.17`.

[Supported Platforms](#supported-platforms)
-------------------------------------------

Following platforms are supported by Electron:

### [macOS](#macos)

Only 64bit binaries are provided for macOS, and the minimum macOS version supported is macOS 10.10 (Yosemite).

### [Windows](#windows)

Windows 7 and later are supported, older operating systems are not supported (and do not work).

Both `ia32` (`x86`) and `x64` (`amd64`) binaries are provided for Windows. Running Electron apps on Windows for ARM devices is possible by using the ia32 binary.

### [Linux](#linux)

The prebuilt `ia32` (`i686`) and `x64` (`amd64`) binaries of Electron are built on Ubuntu 12.04, the `armv7l` binary is built against ARM v7 with hard-float ABI and NEON for Debian Wheezy.

[Until the release of Electron 2.0](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Both binaries are identical.

Whether the prebuilt binary can run on a distribution depends on whether the distribution includes the libraries that Electron is linked to on the building platform, so only Ubuntu 12.04 is guaranteed to work, but following platforms are also verified to be able to run the prebuilt binaries of Electron:

*   Ubuntu 12.04 and newer
*   Fedora 21
*   Debian 8

* * *

Moved to [support.md](/docs/tutorial/support)

* * *

[Synopsis](#synopsis)
=====================

> How to use Node.js and Electron APIs.

All of [Node.js's built-in modules](https://nodejs.org/api/) are available in Electron and third-party node modules also fully supported as well (including the [native modules](/docs/tutorial/using-native-node-modules)).

Electron also provides some extra built-in modules for developing native desktop applications. Some modules are only available in the main process, some are only available in the renderer process (web page), and some can be used in both processes.

The basic rule is: if a module is [GUI](https://en.wikipedia.org/wiki/Graphical_user_interface) or low-level system related, then it should be only available in the main process. You need to be familiar with the concept of [main process vs. renderer process](/docs/tutorial/application-architecture#main-and-renderer-processes) scripts to be able to use those modules.

The main process script is like a normal Node.js script:

    const { app, BrowserWindow } = require('electron')
    let win = null
    
    app.on('ready', () => {
      win = new BrowserWindow({ width: 800, height: 600 })
      win.loadURL('https://github.com')
    })

The renderer process is no different than a normal web page, except for the extra ability to use node modules:

    <!DOCTYPE html>
    <html>
    <body>
    <script>
      const { app } = require('electron').remote
      console.log(app.getVersion())
    </script>
    </body>
    </html>

To run your app, read [Run your app](/docs/tutorial/first-app#running-your-app).

[Destructuring assignment](#destructuring-assignment)
-----------------------------------------------------

As of 0.37, you can use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to make it easier to use built-in modules.

    const { app, BrowserWindow } = require('electron')
    
    let win
    
    app.on('ready', () => {
      win = new BrowserWindow()
      win.loadURL('https://github.com')
    })

If you need the entire `electron` module, you can require it and then using destructuring to access the individual modules from `electron`.

    const electron = require('electron')
    const { app, BrowserWindow } = electron
    
    let win
    
    app.on('ready', () => {
      win = new BrowserWindow()
      win.loadURL('https://github.com')
    })

This is equivalent to the following code:

    const electron = require('electron')
    const app = electron.app
    const BrowserWindow = electron.BrowserWindow
    let win
    
    app.on('ready', () => {
      win = new BrowserWindow()
      win.loadURL('https://github.com')
    })

* * *

[systemPreferences](#systempreferences)
=======================================

> Get system preferences.

Process: [Main](/docs/glossary#main-process)

    const { systemPreferences } = require('electron')
    console.log(systemPreferences.isDarkMode())

[Events](#events)
-----------------

The `systemPreferences` object emits the following events:

### [Event: 'accent-color-changed' _Windows_](#event-accent-color-changed-windows)

Returns:

*   `event` Event
*   `newColor` String - The new RGBA color the user assigned to be their system accent color.

### [Event: 'color-changed' _Windows_](#event-color-changed-windows)

Returns:

*   `event` Event

### [Event: 'inverted-color-scheme-changed' _Windows_](#event-inverted-color-scheme-changed-windows)

Returns:

*   `event` Event
*   `invertedColorScheme` Boolean - `true` if an inverted color scheme, such as a high contrast theme, is being used, `false` otherwise.

### [Event: 'appearance-changed' _macOS_](#event-appearance-changed-macos)

Returns:

*   `newAppearance` String - Can be `dark` or `light`

**NOTE:** This event is only emitted after you have called `startAppLevelAppearanceTrackingOS`

[Methods](#methods)
-------------------

### [`systemPreferences.isDarkMode()` _macOS_](#systempreferencesisdarkmode-macos)

Returns `Boolean` - Whether the system is in Dark Mode.

### [`systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` _macOS_](#systempreferencesisswipetrackingfromscrolleventsenabled-macos)

Returns `Boolean` - Whether the Swipe between pages setting is on.

### [`systemPreferences.postNotification(event, userInfo)` _macOS_](#systempreferencespostnotificationevent-userinfo-macos)

*   `event` String
*   `userInfo` Object

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### [`systemPreferences.postLocalNotification(event, userInfo)` _macOS_](#systempreferencespostlocalnotificationevent-userinfo-macos)

*   `event` String
*   `userInfo` Object

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### [`systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_](#systempreferencespostworkspacenotificationevent-userinfo-macos)

*   `event` String
*   `userInfo` Object

Posts `event` as native notifications of macOS. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

### [`systemPreferences.subscribeNotification(event, callback)` _macOS_](#systempreferencessubscribenotificationevent-callback-macos)

*   `event` String
    
*   `callback` Function
    
    *   `event` String
    *   `userInfo` Object

Returns `Number` - The ID of this subscription

Subscribes to native notifications of macOS, `callback` will be called with `callback(event, userInfo)` when the corresponding `event` happens. The `userInfo` is an Object that contains the user information dictionary sent along with the notification.

The `id` of the subscriber is returned, which can be used to unsubscribe the `event`.

Under the hood this API subscribes to `NSDistributedNotificationCenter`, example values of `event` are:

*   `AppleInterfaceThemeChangedNotification`
*   `AppleAquaColorVariantChanged`
*   `AppleColorPreferencesChangedNotification`
*   `AppleShowScrollBarsSettingChanged`

### [`systemPreferences.subscribeLocalNotification(event, callback)` _macOS_](#systempreferencessubscribelocalnotificationevent-callback-macos)

*   `event` String
    
*   `callback` Function
    
    *   `event` String
    *   `userInfo` Object

Returns `Number` - The ID of this subscription

Same as `subscribeNotification`, but uses `NSNotificationCenter` for local defaults. This is necessary for events such as `NSUserDefaultsDidChangeNotification`.

### [`systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_](#systempreferencessubscribeworkspacenotificationevent-callback-macos)

*   `event` String
*   `callback` Function
    
    *   `event` String
    *   `userInfo` Object

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

### [`systemPreferences.unsubscribeNotification(id)` _macOS_](#systempreferencesunsubscribenotificationid-macos)

*   `id` Integer

Removes the subscriber with `id`.

### [`systemPreferences.unsubscribeLocalNotification(id)` _macOS_](#systempreferencesunsubscribelocalnotificationid-macos)

*   `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSNotificationCenter`.

### [`systemPreferences.unsubscribeWorkspaceNotification(id)` _macOS_](#systempreferencesunsubscribeworkspacenotificationid-macos)

*   `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

### [`systemPreferences.registerDefaults(defaults)` _macOS_](#systempreferencesregisterdefaultsdefaults-macos)

*   `defaults` Object - a dictionary of (`key: value`) user defaults

Add the specified defaults to your application's `NSUserDefaults`.

### [`systemPreferences.getUserDefault(key, type)` _macOS_](#systempreferencesgetuserdefaultkey-type-macos)

*   `key` String
*   `type` String - Can be `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` or `dictionary`.

Returns `any` - The value of `key` in `NSUserDefaults`.

Some popular `key` and `type`s are:

*   `AppleInterfaceStyle`: `string`
*   `AppleAquaColorVariant`: `integer`
*   `AppleHighlightColor`: `string`
*   `AppleShowScrollBars`: `string`
*   `NSNavRecentPlaces`: `array`
*   `NSPreferredWebServices`: `dictionary`
*   `NSUserDictionaryReplacementItems`: `array`

### [`systemPreferences.setUserDefault(key, type, value)` _macOS_](#systempreferencessetuserdefaultkey-type-value-macos)

*   `key` String
*   `type` String - See [`getUserDefault`](#systempreferencesgetuserdefaultkey-type-macos).
*   `value` String

Set the value of `key` in `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Some popular `key` and `type`s are:

*   `ApplePressAndHoldEnabled`: `boolean`

### [`systemPreferences.removeUserDefault(key)` _macOS_](#systempreferencesremoveuserdefaultkey-macos)

*   `key` String

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### [`systemPreferences.isAeroGlassEnabled()` _Windows_](#systempreferencesisaeroglassenabled-windows)

Returns `Boolean` - `true` if [DWM composition](https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx) (Aero Glass) is enabled, and `false` otherwise.

An example of using it to determine if you should create a transparent window or not (transparent windows won't work correctly when DWM composition is disabled):

    const { BrowserWindow, systemPreferences } = require('electron')
    let browserOptions = { width: 1000, height: 800 }
    
    // Make the window transparent only if the platform supports it.
    if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) {
      browserOptions.transparent = true
      browserOptions.frame = false
    }
    
    // Create the window.
    let win = new BrowserWindow(browserOptions)
    
    // Navigate.
    if (browserOptions.transparent) {
      win.loadURL(`file://${__dirname}/index.html`)
    } else {
      // No transparency, so we load a fallback that uses basic styles.
      win.loadURL(`file://${__dirname}/fallback.html`)
    }

### [`systemPreferences.getAccentColor()` _Windows_](#systempreferencesgetaccentcolor-windows)

Returns `String` - The users current system wide accent color preference in RGBA hexadecimal form.

    const color = systemPreferences.getAccentColor() // `"aabbccdd"`
    const red = color.substr(0, 2) // "aa"
    const green = color.substr(2, 2) // "bb"
    const blue = color.substr(4, 2) // "cc"
    const alpha = color.substr(6, 2) // "dd"

### [`systemPreferences.getColor(color)` _Windows_](#systempreferencesgetcolorcolor-windows)

*   `color` String - One of the following values:
    
    *   `3d-dark-shadow` - Dark shadow for three-dimensional display elements.
    *   `3d-face` - Face color for three-dimensional display elements and for dialog box backgrounds.
    *   `3d-highlight` - Highlight color for three-dimensional display elements.
    *   `3d-light` - Light color for three-dimensional display elements.
    *   `3d-shadow` - Shadow color for three-dimensional display elements.
    *   `active-border` - Active window border.
    *   `active-caption` - Active window title bar. Specifies the left side color in the color gradient of an active window's title bar if the gradient effect is enabled.
    *   `active-caption-gradient` - Right side color in the color gradient of an active window's title bar.
    *   `app-workspace` - Background color of multiple document interface (MDI) applications.
    *   `button-text` - Text on push buttons.
    *   `caption-text` - Text in caption, size box, and scroll bar arrow box.
    *   `desktop` - Desktop background color.
    *   `disabled-text` - Grayed (disabled) text.
    *   `highlight` - Item(s) selected in a control.
    *   `highlight-text` - Text of item(s) selected in a control.
    *   `hotlight` - Color for a hyperlink or hot-tracked item.
    *   `inactive-border` - Inactive window border.
    *   `inactive-caption` - Inactive window caption. Specifies the left side color in the color gradient of an inactive window's title bar if the gradient effect is enabled.
    *   `inactive-caption-gradient` - Right side color in the color gradient of an inactive window's title bar.
    *   `inactive-caption-text` - Color of text in an inactive caption.
    *   `info-background` - Background color for tooltip controls.
    *   `info-text` - Text color for tooltip controls.
    *   `menu` - Menu background.
    *   `menu-highlight` - The color used to highlight menu items when the menu appears as a flat menu.
    *   `menubar` - The background color for the menu bar when menus appear as flat menus.
    *   `menu-text` - Text in menus.
    *   `scrollbar` - Scroll bar gray area.
    *   `window` - Window background.
    *   `window-frame` - Window frame.
    *   `window-text` - Text in windows.

Returns `String` - The system color setting in RGB hexadecimal form (`#ABCDEF`). See the [Windows docs](https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx) for more details.

### [`systemPreferences.isInvertedColorScheme()` _Windows_](#systempreferencesisinvertedcolorscheme-windows)

Returns `Boolean` - `true` if an inverted color scheme, such as a high contrast theme, is active, `false` otherwise.

### [`systemPreferences.getEffectiveAppearance()` _macOS_](#systempreferencesgeteffectiveappearance-macos)

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

Please note that until Electron is built targeting the 10.14 SDK, your application's `effectiveAppearance` will default to 'light' and won't inherit the OS preference. In the interim in order for your application to inherit the OS preference you must set the `NSRequiresAquaSystemAppearance` key in your apps `Info.plist` to `false`. If you are using `electron-packager` or `electron-forge` just set the `enableDarwinDarkMode` packager option to `true`. See the [Electron Packager API](https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#darwindarkmodesupport) for more details.

### [`systemPreferences.getAppLevelAppearance()` _macOS_](#systempreferencesgetapplevelappearance-macos)

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

### [`systemPreferences.setAppLevelAppearance(appearance)` _macOS_](#systempreferencessetapplevelappearanceappearance-macos)

*   `appearance` String | null - Can be `dark` or `light`

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

### [`systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_](#systempreferencesistrustedaccessibilityclientprompt-macos)

*   `prompt` Boolean - whether or not the user will be informed via prompt if the current process is untrusted.

Returns `Boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

### [`systemPreferences.getMediaAccessStatus(mediaType)` _macOS_](#systempreferencesgetmediaaccessstatusmediatype-macos)

*   `mediaType` String - `microphone` or `camera`.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `granted` if your system is running 10.13 High Sierra or lower.

### [`systemPreferences.askForMediaAccess(mediaType)` _macOS_](#systempreferencesaskformediaaccessmediatype-macos)

*   `mediaType` String - the type of media being requested; can be `microphone`, `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it _must_ be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.

* * *

[Task Object](#task-object)
===========================

*   `program` String - Path of the program to execute, usually you should specify `process.execPath` which opens the current program.
*   `arguments` String - The command line arguments when `program` is executed.
*   `title` String - The string to be displayed in a JumpList.
*   `description` String - Description of this task.
*   `iconPath` String - The absolute path to an icon to be displayed in a JumpList, which can be an arbitrary resource file that contains an icon. You can usually specify `process.execPath` to show the icon of the program.
*   `iconIndex` Number - The icon index in the icon file. If an icon file consists of two or more icons, set this value to identify the icon. If an icon file consists of one icon, this value is 0.

* * *

[Testing](#testing)
===================

We aim to keep the code coverage of Electron high. We ask that all pull request not only pass all existing tests, but ideally also add new tests to cover changed code and new scenarios. Ensuring that we capture as many code paths and use cases of Electron as possible ensures that we all ship apps with fewer bugs.

This repository comes with linting rules for both JavaScript and C++ – as well as unit and integration tests. To learn more about Electron's coding style, please see the [coding-style](/docs/development/coding-style) document.

[Linting](#linting)
-------------------

To ensure that your JavaScript is in compliance with the Electron coding style, run `npm run lint-js`, which will run `standard` against both Electron itself as well as the unit tests. If you are using an editor with a plugin/addon system, you might want to use one of the many [StandardJS addons](https://standardjs.com/#are-there-text-editor-plugins) to be informed of coding style violations before you ever commit them.

To run `standard` with parameters, run `npm run lint-js --` followed by arguments you want passed to `standard`.

To ensure that your C++ is in compliance with the Electron coding style, run `npm run lint-cpp`, which runs a `cpplint` script. We recommend that you use `clang-format` and prepared [a short tutorial](/docs/development/clang-format).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

[Unit Tests](#unit-tests)
-------------------------

To run all unit tests, run `npm run test`. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only specific tests matching a pattern, run `npm run test -- -g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.

* * *

[Testing on Headless CI Systems (Travis CI, Jenkins)](#testing-on-headless-ci-systems-travis-ci-jenkins)
========================================================================================================

Being based on Chromium, Electron requires a display driver to function. If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. Testing Electron-based apps on Travis, Circle, Jenkins or similar Systems requires therefore a little bit of configuration. In essence, we need to use a virtual display driver.

[Configuring the Virtual Display Server](#configuring-the-virtual-display-server)
---------------------------------------------------------------------------------

First, install [Xvfb](https://en.wikipedia.org/wiki/Xvfb). It's a virtual framebuffer, implementing the X11 display server protocol - it performs all graphical operations in memory without showing any screen output, which is exactly what we need.

Then, create a virtual xvfb screen and export an environment variable called DISPLAY that points to it. Chromium in Electron will automatically look for `$DISPLAY`, so no further configuration of your app is required. This step can be automated with Paul Betts's [xvfb-maybe](https://github.com/paulcbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure xvfb, if required by the current system. On Windows or macOS, it will do nothing.

    ## On Windows or macOS, this invokes electron-mocha
    ## On Linux, if we are in a headless environment, this will be equivalent
    ## to xvfb-run electron-mocha ./test/*.js
    xvfb-maybe electron-mocha ./test/*.js

### [Travis CI](#travis-ci)

On Travis, your `.travis.yml` should look roughly like this:

    addons:
      apt:
        packages:
          - xvfb
    
    install:
      - export DISPLAY=':99.0'
      - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &

### [Jenkins](#jenkins)

For Jenkins, a [Xvfb plugin is available](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin).

### [Circle CI](#circle-ci)

Circle CI is awesome and has xvfb and `$DISPLAY` [already setup, so no further configuration is required](https://circleci.com/docs/environment#browsers).

### [AppVeyor](#appveyor)

AppVeyor runs on Windows, supporting Selenium, Chromium, Electron and similar tools out of the box - no configuration is required.

* * *

[Testing Widevine CDM](#testing-widevine-cdm)
=============================================

In Electron you can use the Widevine CDM library shipped with Chrome browser.

Widevine Content Decryption Modules (CDMs) are how streaming services protect content using HTML5 video to web browsers without relying on an NPAPI plugin like Flash or Silverlight. Widevine support is an alternative solution for streaming services that currently rely on Silverlight for playback of DRM-protected video content. It will allow websites to show DRM-protected video content in Firefox without the use of NPAPI plugins. The Widevine CDM runs in an open-source CDM sandbox providing better user security than NPAPI plugins.

#### [Note on VMP](#note-on-vmp)

As of [`Electron v1.8.0 (Chrome v59)`](https://electronjs.org/releases#1.8.1), the below steps are may only be some of the necessary steps to enable Widevine; any app on or after that version intending to use the Widevine CDM may need to be signed using a license obtained from [Widevine](https://www.widevine.com/) itself.

Per [Widevine](https://www.widevine.com/):

> Chrome 59 (and later) includes support for Verified Media Path (VMP). VMP provides a method to verify the authenticity of a device platform. For browser deployments, this will provide an additional signal to determine if a browser-based implementation is reliable and secure.
> 
> The proxy integration guide has been updated with information about VMP and how to issue licenses.
> 
> Widevine recommends our browser-based integrations (vendors and browser-based applications) add support for VMP.

To enable video playback with this new restriction, [castLabs](https://castlabs.com/open-source/downstream/) has created a [fork](https://github.com/castlabs/electron-releases) that has implemented the necessary changes to enable Widevine to be played in an Electron application if one has obtained the necessary licenses from widevine.

[Getting the library](#getting-the-library)
-------------------------------------------

Open `chrome://components/` in Chrome browser, find `Widevine Content Decryption Module` and make sure it is up to date, then you can find the library files from the application directory.

### [On Windows](#on-windows)

The library file `widevinecdm.dll` will be under `Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/` directory.

### [On MacOS](#on-macos)

The library file `libwidevinecdm.dylib` will be under `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` directory.

**Note:** Make sure that chrome version used by Electron is greater than or equal to the `min_chrome_version` value of Chrome's widevine cdm component. The value can be found in `manifest.json` under `WidevineCdm` directory.

[Using the library](#using-the-library)
---------------------------------------

After getting the library files, you should pass the path to the file with `--widevine-cdm-path` command line switch, and the library's version with `--widevine-cdm-version` switch. The command line switches have to be passed before the `ready` event of `app` module gets emitted.

Example code:

    const { app, BrowserWindow } = require('electron')
    
    // You have to pass the directory that contains widevine library here, it is
    // * `libwidevinecdm.dylib` on macOS,
    // * `widevinecdm.dll` on Windows.
    app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
    // The version of plugin can be got from `chrome://plugins` page in Chrome.
    app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')
    
    let win = null
    app.on('ready', () => {
      win = new BrowserWindow()
      win.show()
    })

[Verifying Widevine CDM support](#verifying-widevine-cdm-support)
-----------------------------------------------------------------

To verify whether widevine works, you can use following ways:

*   Open [https://shaka-player-demo.appspot.com/](https://shaka-player-demo.appspot.com/) and load a manifest that uses `Widevine`.
*   Open [http://www.dash-player.com/demo/drm-test-area/](http://www.dash-player.com/demo/drm-test-area/), check whether the page says `bitdash uses Widevine in your browser`, then play the video.

* * *

[ThumbarButton Object](#thumbarbutton-object)
=============================================

*   `icon` [NativeImage](/docs/api/native-image) - The icon showing in thumbnail toolbar.
*   `click` Function
*   `tooltip` String (optional) - The text of the button's tooltip.
*   `flags` String[](/docs/api/structures/optional) - Control specific states and behaviors of the button. By default, it is `['enabled']`.

The `flags` is an array that can include following `String`s:

*   `enabled` - The button is active and available to the user.
*   `disabled` - The button is disabled. It is present, but has a visual state indicating it will not respond to user action.
*   `dismissonclick` - When the button is clicked, the thumbnail window closes immediately.
*   `nobackground` - Do not draw a button border, use only the image.
*   `hidden` - The button is not shown to the user.
*   `noninteractive` - The button is enabled but not interactive; no pressed button state is drawn. This value is intended for instances where the button is used in a notification.

* * *

[Class: TouchBar](#class-touchbar)
----------------------------------

> Create TouchBar layouts for native macOS applications

Process: [Main](/docs/tutorial/application-architecture#main-and-renderer-processes)

### [`new TouchBar(options)` _Experimental_](#new-touchbaroptions-experimental)

*   `options` Object
    
    *   `items` ([TouchBarButton](/docs/api/touch-bar-button) | [TouchBarColorPicker](/docs/api/touch-bar-color-picker) | [TouchBarGroup](/docs/api/touch-bar-group) | [TouchBarLabel](/docs/api/touch-bar-label) | [TouchBarPopover](/docs/api/touch-bar-popover) | [TouchBarScrubber](/docs/api/touch-bar-scrubber) | [TouchBarSegmentedControl](/docs/api/touch-bar-segmented-control) | [TouchBarSlider](/docs/api/touch-bar-slider) | [TouchBarSpacer](/docs/api/touch-bar-spacer))\[\]
    *   `escapeItem` ([TouchBarButton](/docs/api/touch-bar-button) | [TouchBarColorPicker](/docs/api/touch-bar-color-picker) | [TouchBarGroup](/docs/api/touch-bar-group) | [TouchBarLabel](/docs/api/touch-bar-label) | [TouchBarPopover](/docs/api/touch-bar-popover) | [TouchBarScrubber](/docs/api/touch-bar-scrubber) | [TouchBarSegmentedControl](/docs/api/touch-bar-segmented-control) | [TouchBarSlider](/docs/api/touch-bar-slider) | [TouchBarSpacer](/docs/api/touch-bar-spacer) | null) (optional)

Creates a new touch bar with the specified items. Use `BrowserWindow.setTouchBar` to add the `TouchBar` to a window.

**Note:** The TouchBar API is currently experimental and may change or be removed in future Electron releases.

**Tip:** If you don't have a MacBook with Touch Bar, you can use [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) to test Touch Bar usage in your app.

### [Instance Properties](#instance-properties)

The following properties are available on instances of `TouchBar`:

#### [`touchBar.escapeItem`](#touchbarescapeitem)

A `TouchBarItem` that will replace the "esc" button on the touch bar when set. Setting to `null` restores the default "esc" button. Changing this value immediately updates the escape item in the touch bar.

[Examples](#examples)
---------------------

Below is an example of a simple slot machine touch bar game with a button and some labels.

    const { app, BrowserWindow, TouchBar } = require('electron')
    
    const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar
    
    let spinning = false
    
    // Reel labels
    const reel1 = new TouchBarLabel()
    const reel2 = new TouchBarLabel()
    const reel3 = new TouchBarLabel()
    
    // Spin result label
    const result = new TouchBarLabel()
    
    // Spin button
    const spin = new TouchBarButton({
      label: '🎰 Spin',
      backgroundColor: '#7851A9',
      click: () => {
        // Ignore clicks if already spinning
        if (spinning) {
          return
        }
    
        spinning = true
        result.label = ''
    
        let timeout = 10
        const spinLength = 4 * 1000 // 4 seconds
        const startTime = Date.now()
    
        const spinReels = () => {
          updateReels()
    
          if ((Date.now() - startTime) >= spinLength) {
            finishSpin()
          } else {
            // Slow down a bit on each spin
            timeout *= 1.1
            setTimeout(spinReels, timeout)
          }
        }
    
        spinReels()
      }
    })
    
    const getRandomValue = () => {
      const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
      return values[Math.floor(Math.random() * values.length)]
    }
    
    const updateReels = () => {
      reel1.label = getRandomValue()
      reel2.label = getRandomValue()
      reel3.label = getRandomValue()
    }
    
    const finishSpin = () => {
      const uniqueValues = new Set([reel1.label, reel2.label, reel3.label]).size
      if (uniqueValues === 1) {
        // All 3 values are the same
        result.label = '💰 Jackpot!'
        result.textColor = '#FDFF00'
      } else if (uniqueValues === 2) {
        // 2 values are the same
        result.label = '😍 Winner!'
        result.textColor = '#FDFF00'
      } else {
        // No values are the same
        result.label = '🙁 Spin Again'
        result.textColor = null
      }
      spinning = false
    }
    
    const touchBar = new TouchBar([
      spin,
      new TouchBarSpacer({ size: 'large' }),
      reel1,
      new TouchBarSpacer({ size: 'small' }),
      reel2,
      new TouchBarSpacer({ size: 'small' }),
      reel3,
      new TouchBarSpacer({ size: 'large' }),
      result
    ])
    
    let window
    
    app.once('ready', () => {
      window = new BrowserWindow({
        frame: false,
        titleBarStyle: 'hiddenInset',
        width: 200,
        height: 200,
        backgroundColor: '#000'
      })
      window.loadURL('about:blank')
      window.setTouchBar(touchBar)
    })

### [Running the above example](#running-the-above-example)

To run the example above, you'll need to (assuming you've got a terminal open in the directory you want to run the example):

1.  Save the above file to your computer as `touchbar.js`
2.  Install Electron via `npm install electron`
3.  Run the example inside Electron: `./node_modules/.bin/electron touchbar.js`

You should then see a new Electron window and the app running in your touch bar (or touch bar emulator).

* * *

[Class: TouchBarButton](#class-touchbarbutton)
----------------------------------------------

> Create a button in the touch bar for native macOS applications

Process: [Main](/docs/tutorial/application-architecture#main-and-renderer-processes)

### [`new TouchBarButton(options)` _Experimental_](#new-touchbarbuttonoptions-experimental)

*   `options` Object
    
    *   `label` String (optional) - Button text.
    *   `backgroundColor` String (optional) - Button background color in hex format, i.e `#ABCDEF`.
    *   `icon` [NativeImage](/docs/api/native-image) (optional) - Button icon.
    *   `iconPosition` String (optional) - Can be `left`, `right` or `overlay`.
    *   `click` Function (optional) - Function to call when the button is clicked.

### [Instance Properties](#instance-properties)

The following properties are available on instances of `TouchBarButton`:

#### [`touchBarButton.label`](#touchbarbuttonlabel)

A `String` representing the button's current text. Changing this value immediately updates the button in the touch bar.

#### [`touchBarButton.backgroundColor`](#touchbarbuttonbackgroundcolor)

A `String` hex code representing the button's current background color. Changing this value immediately updates the button in the touch bar.

#### [`touchBarButton.icon`](#touchbarbuttonicon)

A `NativeImage` representing the button's current icon. Changing this value immediately updates the button in the touch bar.

* * *

[Class: TouchBarColorPicker](#class-touchbarcolorpicker)
--------------------------------------------------------

> Create a color picker in the touch bar for native macOS applications

Process: [Main](/docs/tutorial/application-architecture#main-and-renderer-processes)

### [`new TouchBarColorPicker(options)` _Experimental_](#new-touchbarcolorpickeroptions-experimental)

*   `options` Object
    
    *   `availableColors` String[](/docs/api/optional) - Array of hex color strings to appear as possible colors to select.
    *   `selectedColor` String (optional) - The selected hex color in the picker, i.e `#ABCDEF`.
    *   `change` Function (optional) - Function to call when a color is selected.
        
        *   `color` String - The color that the user selected from the picker.

### [Instance Properties](#instance-properties)

The following properties are available on instances of `TouchBarColorPicker`:

#### [`touchBarColorPicker.availableColors`](#touchbarcolorpickeravailablecolors)

A `String[]` array representing the color picker's available colors to select. Changing this value immediately updates the color picker in the touch bar.

#### [`touchBarColorPicker.selectedColor`](#touchbarcolorpickerselectedcolor)

A `String` hex code representing the color picker's currently selected color. Changing this value immediately updates the color picker in the touch bar.

* * *

[Class: TouchBarGroup](#class-touchbargroup)
--------------------------------------------

> Create a group in the touch bar for native macOS applications

Process: [Main](/docs/tutorial/application-architecture#main-and-renderer-processes)

### [`new TouchBarGroup(options)` _Experimental_](#new-touchbargroupoptions-experimental)

*   `options` Object
    
    *   `items` [TouchBar](/docs/api/touch-bar) - Items to display as a group.

* * *

[Class: TouchBarLabel](#class-touchbarlabel)
--------------------------------------------

> Create a label in the touch bar for native macOS applications

Process: [Main](/docs/tutorial/application-architecture#main-and-renderer-processes)

### [`new TouchBarLabel(options)` _Experimental_](#new-touchbarlabeloptions-experimental)

*   `options` Object
    
    *   `label` String (optional) - Text to display.
    *   `textColor` String (optional) - Hex color of text, i.e `#ABCDEF`.

### [Instance Properties](#instance-properties)

The following properties are available on instances of `TouchBarLabel`:

#### [`touchBarLabel.label`](#touchbarlabellabel)

A `String` representing the label's current text. Changing this value immediately updates the label in the touch bar.

#### [`touchBarLabel.textColor`](#touchbarlabeltextcolor)

A `String` hex code representing the label's current text color. Changing this value immediately updates the label in the touch bar.

* * *

[Class: TouchBarPopover](#class-touchbarpopover)
------------------------------------------------

> Create a popover in the touch bar for native macOS applications

Process: [Main](/docs/tutorial/application-architecture#main-and-renderer-processes)

### [`new TouchBarPopover(options)` _Experimental_](#new-touchbarpopoveroptions-experimental)

*   `options` Object
    
    *   `label` String (optional) - Popover button text.
    *   `icon` [NativeImage](/docs/api/native-image) (optional) - Popover button icon.
    *   `items` [TouchBar](/docs/api/touch-bar) (optional) - Items to display in the popover.
    *   `showCloseButton` Boolean (optional) - `true` to display a close button on the left of the popover, `false` to not show it. Default is `true`.

### [Instance Properties](#instance-properties)

The following properties are available on instances of `TouchBarPopover`:

#### [`touchBarPopover.label`](#touchbarpopoverlabel)

A `String` representing the popover's current button text. Changing this value immediately updates the popover in the touch bar.

#### [`touchBarPopover.icon`](#touchbarpopovericon)

A `NativeImage` representing the popover's current button icon. Changing this value immediately updates the popover in the touch bar.

* * *

[Class: TouchBarScrubber](#class-touchbarscrubber)
--------------------------------------------------

> Create a scrubber (a scrollable selector)

Process: [Main](/docs/tutorial/application-architecture#main-and-renderer-processes)

### [`new TouchBarScrubber(options)` _Experimental_](#new-touchbarscrubberoptions-experimental)

*   `options` Object
    
    *   `items` [ScrubberItem\[\]](/docs/api/structures/scrubber-item) - An array of items to place in this scrubber.
    *   `select` Function - Called when the user taps an item that was not the last tapped item.
        
        *   `selectedIndex` Integer - The index of the item the user selected.
    *   `highlight` Function - Called when the user taps any item.
        
        *   `highlightedIndex` Integer - The index of the item the user touched.
    *   `selectedStyle` String - Selected item style. Defaults to `null`.
    *   `overlayStyle` String - Selected overlay item style. Defaults to `null`.
    *   `showArrowButtons` Boolean - Defaults to `false`.
    *   `mode` String - Defaults to `free`.
    *   `continuous` Boolean - Defaults to `true`.

### [Instance Properties](#instance-properties)

The following properties are available on instances of `TouchBarScrubber`:

#### [`touchBarScrubber.items`](#touchbarscrubberitems)

A `ScrubberItem[]` array representing the items in this scrubber. Updating this value immediately updates the control in the touch bar. Updating deep properties inside this array **does not update the touch bar**.

#### [`touchBarScrubber.selectedStyle`](#touchbarscrubberselectedstyle)

A `String` representing the style that selected items in the scrubber should have. Updating this value immediately updates the control in the touch bar. Possible values:

*   `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
*   `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
*   `null` - Actually null, not a string, removes all styles.

#### [`touchBarScrubber.overlayStyle`](#touchbarscrubberoverlaystyle)

A `String` representing the style that selected items in the scrubber should have. This style is overlayed on top of the scrubber item instead of being placed behind it. Updating this value immediately updates the control in the touch bar. Possible values:

*   `background` - Maps to `[NSScrubberSelectionStyle roundedBackgroundStyle]`.
*   `outline` - Maps to `[NSScrubberSelectionStyle outlineOverlayStyle]`.
*   `null` - Actually null, not a string, removes all styles.

#### [`touchBarScrubber.showArrowButtons`](#touchbarscrubbershowarrowbuttons)

A `Boolean` representing whether to show the left / right selection arrows in this scrubber. Updating this value immediately updates the control in the touch bar.

#### [`touchBarScrubber.mode`](#touchbarscrubbermode)

A `String` representing the mode of this scrubber. Updating this value immediately updates the control in the touch bar. Possible values:

*   `fixed` - Maps to `NSScrubberModeFixed`.
*   `free` - Maps to `NSScrubberModeFree`.

#### [`touchBarScrubber.continuous`](#touchbarscrubbercontinuous)

A `Boolean` representing whether this scrubber is continuous or not. Updating this value immediately updates the control in the touch bar.

* * *

[Class: TouchBarSegmentedControl](#class-touchbarsegmentedcontrol)
------------------------------------------------------------------

> Create a segmented control (a button group) where one button has a selected state

Process: [Main](/docs/tutorial/application-architecture#main-and-renderer-processes)

### [`new TouchBarSegmentedControl(options)` _Experimental_](#new-touchbarsegmentedcontroloptions-experimental)

*   `options` Object
    
    *   `segmentStyle` String (optional) - Style of the segments:
        
        *   `automatic` - Default. The appearance of the segmented control is automatically determined based on the type of window in which the control is displayed and the position within the window.
        *   `rounded` - The control is displayed using the rounded style.
        *   `textured-rounded` - The control is displayed using the textured rounded style.
        *   `round-rect` - The control is displayed using the round rect style.
        *   `textured-square` - The control is displayed using the textured square style.
        *   `capsule` - The control is displayed using the capsule style.
        *   `small-square` - The control is displayed using the small square style.
        *   `separated` - The segments in the control are displayed very close to each other but not touching.
    *   `mode` String (optional) - The selection mode of the control:
        
        *   `single` - Default. One item selected at a time, selecting one deselects the previously selected item.
        *   `multiple` - Multiple items can be selected at a time.
        *   `buttons` - Make the segments act as buttons, each segment can be pressed and released but never marked as active.
    *   `segments` [SegmentedControlSegment\[\]](/docs/api/structures/segmented-control-segment) - An array of segments to place in this control.
    *   `selectedIndex` Integer (optional) - The index of the currently selected segment, will update automatically with user interaction. When the mode is multiple it will be the last selected item.
    *   `change` Function - Called when the user selects a new segment.
        
        *   `selectedIndex` Integer - The index of the segment the user selected.
        *   `isSelected` Boolean - Whether as a result of user selection the segment is selected or not.

### [Instance Properties](#instance-properties)

The following properties are available on instances of `TouchBarSegmentedControl`:

#### [`touchBarSegmentedControl.segmentStyle`](#touchbarsegmentedcontrolsegmentstyle)

A `String` representing the controls current segment style. Updating this value immediately updates the control in the touch bar.

#### [`touchBarSegmentedControl.segments`](#touchbarsegmentedcontrolsegments)

A `SegmentedControlSegment[]` array representing the segments in this control. Updating this value immediately updates the control in the touch bar. Updating deep properties inside this array **does not update the touch bar**.

#### [`touchBarSegmentedControl.selectedIndex`](#touchbarsegmentedcontrolselectedindex)

An `Integer` representing the currently selected segment. Changing this value immediately updates the control in the touch bar. User interaction with the touch bar will update this value automatically.

* * *

[Class: TouchBarSlider](#class-touchbarslider)
----------------------------------------------

> Create a slider in the touch bar for native macOS applications

Process: [Main](/docs/tutorial/application-architecture#main-and-renderer-processes)

### [`new TouchBarSlider(options)` _Experimental_](#new-touchbarslideroptions-experimental)

*   `options` Object
    
    *   `label` String (optional) - Label text.
    *   `value` Integer (optional) - Selected value.
    *   `minValue` Integer (optional) - Minimum value.
    *   `maxValue` Integer (optional) - Maximum value.
    *   `change` Function (optional) - Function to call when the slider is changed.
        
        *   `newValue` Number - The value that the user selected on the Slider.

### [Instance Properties](#instance-properties)

The following properties are available on instances of `TouchBarSlider`:

#### [`touchBarSlider.label`](#touchbarsliderlabel)

A `String` representing the slider's current text. Changing this value immediately updates the slider in the touch bar.

#### [`touchBarSlider.value`](#touchbarslidervalue)

A `Number` representing the slider's current value. Changing this value immediately updates the slider in the touch bar.

#### [`touchBarSlider.minValue`](#touchbarsliderminvalue)

A `Number` representing the slider's current minimum value. Changing this value immediately updates the slider in the touch bar.

#### [`touchBarSlider.maxValue`](#touchbarslidermaxvalue)

A `Number` representing the slider's current maximum value. Changing this value immediately updates the slider in the touch bar.

* * *

[Class: TouchBarSpacer](#class-touchbarspacer)
----------------------------------------------

> Create a spacer between two items in the touch bar for native macOS applications

Process: [Main](/docs/tutorial/application-architecture#main-and-renderer-processes)

### [`new TouchBarSpacer(options)` _Experimental_](#new-touchbarspaceroptions-experimental)

*   `options` Object
    
    *   `size` String (optional) - Size of spacer, possible values are:
        
        *   `small` - Small space between items.
        *   `large` - Large space between items.
        *   `flexible` - Take up all available space.

* * *

[TraceCategoriesAndOptions Object](#tracecategoriesandoptions-object)
=====================================================================

*   `categoryFilter` String – is a filter to control what category groups should be traced. A filter can have an optional `-` prefix to exclude category groups that contain a matching category. Having both included and excluded category patterns in the same list is not supported. Examples: `test_MyTest*`, `test_MyTest*,test_OtherStuff`, `-excluded_category1,-excluded_category2`.
*   `traceOptions` String - Controls what kind of tracing is enabled, it is a comma-delimited sequence of the following strings: `record-until-full`, `record-continuously`, `trace-to-console`, `enable-sampling`, `enable-systrace`, e.g. `'record-until-full,enable-sampling'`. The first 3 options are trace recording modes and hence mutually exclusive. If more than one trace recording modes appear in the `traceOptions` string, the last one takes precedence. If none of the trace recording modes are specified, recording mode is `record-until-full`. The trace option will first be reset to the default option (`record_mode` set to `record-until-full`, `enable_sampling` and `enable_systrace` set to `false`) before options parsed from `traceOptions` are applied on it.

* * *

[TraceConfig Object](#traceconfig-object)
=========================================

*   `included_categories` String[](/docs/api/structures/optional)
*   `excluded_categories` String[](/docs/api/structures/optional)
*   `memory_dump_config` Object (optional)

See an example in the [Chromium docs](https://chromium.googlesource.com/chromium/src/+/master/docs/memory-infra/memory_infra_startup_tracing.md#the-advanced-way).

* * *

[Transaction Object](#transaction-object)
=========================================

*   `transactionIdentifier` String - A string that uniquely identifies a successful payment transaction.
*   `transactionDate` String - The date the transaction was added to the App Store’s payment queue.
*   `originalTransactionIdentifier` String - The identifier of the restored transaction by the App Store.
*   `transactionState` String - The transaction state, can be `purchasing`, `purchased`, `failed`, `restored` or `deferred`.
*   `errorCode` Integer - The error code if an error occurred while processing the transaction.
*   `errorMessage` String - The error message if an error occurred while processing the transaction.
*   `payment` Object
    
    *   `productIdentifier` String - The identifier of the purchased product.
    *   `quantity` Integer - The quantity purchased.

* * *

[Class: Tray](#class-tray)
--------------------------

> Add icons and context menus to the system's notification area.

Process: [Main](/docs/glossary#main-process)

`Tray` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter).

    const { app, Menu, Tray } = require('electron')
    
    let tray = null
    app.on('ready', () => {
      tray = new Tray('/path/to/my/icon')
      const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' },
        { label: 'Item3', type: 'radio', checked: true },
        { label: 'Item4', type: 'radio' }
      ])
      tray.setToolTip('This is my application.')
      tray.setContextMenu(contextMenu)
    })

**Platform limitations:**

*   On Linux the app indicator will be used if it is supported, otherwise `GtkStatusIcon` will be used instead.
*   On Linux distributions that only have app indicator support, you have to install `libappindicator1` to make the tray icon work.
*   App indicator will only be shown when it has a context menu.
*   When app indicator is used on Linux, the `click` event is ignored.
*   On Linux in order for changes made to individual `MenuItem`s to take effect, you have to call `setContextMenu` again. For example:

    const { app, Menu, Tray } = require('electron')
    
    let appIcon = null
    app.on('ready', () => {
      appIcon = new Tray('/path/to/my/icon')
      const contextMenu = Menu.buildFromTemplate([
        { label: 'Item1', type: 'radio' },
        { label: 'Item2', type: 'radio' }
      ])
    
      // Make a change to the context menu
      contextMenu.items[1].checked = false
    
      // Call this again for Linux because we modified the context menu
      appIcon.setContextMenu(contextMenu)
    })

*   On Windows it is recommended to use `ICO` icons to get best visual effects.

If you want to keep exact same behaviors on all platforms, you should not rely on the `click` event and always attach a context menu to the tray icon.

### [`new Tray(image)`](#new-trayimage)

*   `image` ([NativeImage](/docs/api/native-image) | String)

Creates a new tray icon associated with the `image`.

### [Instance Events](#instance-events)

The `Tray` module emits the following events:

#### [Event: 'click'](#event-click)

*   `event` Event
    
    *   `altKey` Boolean
    *   `shiftKey` Boolean
    *   `ctrlKey` Boolean
    *   `metaKey` Boolean
*   `bounds` [Rectangle](/docs/api/structures/rectangle) - The bounds of tray icon.
*   `position` [Point](/docs/api/structures/point) - The position of the event.

Emitted when the tray icon is clicked.

#### [Event: 'right-click' _macOS_ _Windows_](#event-right-click-macos-windows)

*   `event` Event
    
    *   `altKey` Boolean
    *   `shiftKey` Boolean
    *   `ctrlKey` Boolean
    *   `metaKey` Boolean
*   `bounds` [Rectangle](/docs/api/structures/rectangle) - The bounds of tray icon.

Emitted when the tray icon is right clicked.

#### [Event: 'double-click' _macOS_ _Windows_](#event-double-click-macos-windows)

*   `event` Event
    
    *   `altKey` Boolean
    *   `shiftKey` Boolean
    *   `ctrlKey` Boolean
    *   `metaKey` Boolean
*   `bounds` [Rectangle](/docs/api/structures/rectangle) - The bounds of tray icon.

Emitted when the tray icon is double clicked.

#### [Event: 'balloon-show' _Windows_](#event-balloon-show-windows)

Emitted when the tray balloon shows.

#### [Event: 'balloon-click' _Windows_](#event-balloon-click-windows)

Emitted when the tray balloon is clicked.

#### [Event: 'balloon-closed' _Windows_](#event-balloon-closed-windows)

Emitted when the tray balloon is closed because of timeout or user manually closes it.

#### [Event: 'drop' _macOS_](#event-drop-macos)

Emitted when any dragged items are dropped on the tray icon.

#### [Event: 'drop-files' _macOS_](#event-drop-files-macos)

*   `event` Event
*   `files` String\[\] - The paths of the dropped files.

Emitted when dragged files are dropped in the tray icon.

#### [Event: 'drop-text' _macOS_](#event-drop-text-macos)

*   `event` Event
*   `text` String - the dropped text string.

Emitted when dragged text is dropped in the tray icon.

#### [Event: 'drag-enter' _macOS_](#event-drag-enter-macos)

Emitted when a drag operation enters the tray icon.

#### [Event: 'drag-leave' _macOS_](#event-drag-leave-macos)

Emitted when a drag operation exits the tray icon.

#### [Event: 'drag-end' _macOS_](#event-drag-end-macos)

Emitted when a drag operation ends on the tray or ends at another location.

#### [Event: 'mouse-enter' _macOS_](#event-mouse-enter-macos)

*   `event` Event
    
    *   `altKey` Boolean
    *   `shiftKey` Boolean
    *   `ctrlKey` Boolean
    *   `metaKey` Boolean
*   `position` [Point](/docs/api/structures/point) - The position of the event.

Emitted when the mouse enters the tray icon.

#### [Event: 'mouse-leave' _macOS_](#event-mouse-leave-macos)

*   `event` Event
    
    *   `altKey` Boolean
    *   `shiftKey` Boolean
    *   `ctrlKey` Boolean
    *   `metaKey` Boolean
*   `position` [Point](/docs/api/structures/point) - The position of the event.

Emitted when the mouse exits the tray icon.

#### [Event: 'mouse-move' _macOS_](#event-mouse-move-macos)

*   `event` Event
    
    *   `altKey` Boolean
    *   `shiftKey` Boolean
    *   `ctrlKey` Boolean
    *   `metaKey` Boolean
*   `position` [Point](/docs/api/structures/point) - The position of the event.

Emitted when the mouse moves in the tray icon.

### [Instance Methods](#instance-methods)

The `Tray` class has the following methods:

#### [`tray.destroy()`](#traydestroy)

Destroys the tray icon immediately.

#### [`tray.setImage(image)`](#traysetimageimage)

*   `image` ([NativeImage](/docs/api/native-image) | String)

Sets the `image` associated with this tray icon.

#### [`tray.setPressedImage(image)` _macOS_](#traysetpressedimageimage-macos)

*   `image` ([NativeImage](/docs/api/native-image) | String)

Sets the `image` associated with this tray icon when pressed on macOS.

#### [`tray.setToolTip(toolTip)`](#traysettooltiptooltip)

*   `toolTip` String

Sets the hover text for this tray icon.

#### [`tray.setTitle(title)` _macOS_](#traysettitletitle-macos)

*   `title` String

Sets the title displayed aside of the tray icon in the status bar (Support ANSI colors).

#### [`tray.setHighlightMode(mode)` _macOS_](#traysethighlightmodemode-macos)

*   `mode` String - Highlight mode with one of the following values:
    
    *   `selection` - Highlight the tray icon when it is clicked and also when its context menu is open. This is the default.
    *   `always` - Always highlight the tray icon.
    *   `never` - Never highlight the tray icon.

Sets when the tray's icon background becomes highlighted (in blue).

**Note:** You can use `highlightMode` with a [`BrowserWindow`](/docs/api/browser-window) by toggling between `'never'` and `'always'` modes when the window visibility changes.

    const { BrowserWindow, Tray } = require('electron')
    
    const win = new BrowserWindow({ width: 800, height: 600 })
    const tray = new Tray('/path/to/my/icon')
    
    tray.on('click', () => {
      win.isVisible() ? win.hide() : win.show()
    })
    win.on('show', () => {
      tray.setHighlightMode('always')
    })
    win.on('hide', () => {
      tray.setHighlightMode('never')
    })

#### [`tray.setIgnoreDoubleClickEvents(ignore)` _macOS_](#traysetignoredoubleclickeventsignore-macos)

*   `ignore` Boolean

Sets the option to ignore double click events. Ignoring these events allows you to detect every individual click of the tray icon.

This value is set to false by default.

#### [`tray.getIgnoreDoubleClickEvents()` _macOS_](#traygetignoredoubleclickevents-macos)

Returns `Boolean` - Whether double click events will be ignored.

#### [`tray.displayBalloon(options)` _Windows_](#traydisplayballoonoptions-windows)

*   `options` Object
    
    *   `icon` ([NativeImage](/docs/api/native-image) | String) (optional) -
    *   `title` String
    *   `content` String

Displays a tray balloon.

#### [`tray.popUpContextMenu([menu, position])` _macOS_ _Windows_](#traypopupcontextmenumenu-position-macos-windows)

*   `menu` Menu (optional)
*   `position` [Point](/docs/api/structures/point) (optional) - The pop up position.

Pops up the context menu of the tray icon. When `menu` is passed, the `menu` will be shown instead of the tray icon's context menu.

The `position` is only available on Windows, and it is (0, 0) by default.

#### [`tray.setContextMenu(menu)`](#traysetcontextmenumenu)

*   `menu` Menu | null

Sets the context menu for this icon.

#### [`tray.getBounds()` _macOS_ _Windows_](#traygetbounds-macos-windows)

Returns [`Rectangle`](/docs/api/structures/rectangle)

The `bounds` of this tray icon as `Object`.

#### [`tray.isDestroyed()`](#trayisdestroyed)

Returns `Boolean` - Whether the tray icon is destroyed.

* * *

[Updating Applications](#updating-applications)
===============================================

There are several ways to update an Electron application. The easiest and officially supported one is taking advantage of the built-in [Squirrel](https://github.com/Squirrel) framework and Electron's [autoUpdater](/docs/api/auto-updater) module.

[Using `update.electronjs.org`](#using-updateelectronjsorg)
-----------------------------------------------------------

GitHub's Electron team maintains [update.electronjs.org](https://github.com/electron/update.electronjs.org), a free and open-source webservice that Electron apps can use to self-update. The service is designed for Electron apps that meet the following criteria:

*   App runs on macOS or Windows
*   App has a public GitHub repository
*   Builds are published to GitHub Releases
*   Builds are code-signed

The easiest way to use this service is by installing [update-electron-app](https://github.com/electron/update-electron-app), a Node.js module preconfigured for use with update.electronjs.org.

Install the module:

    npm install update-electron-app

Invoke the updater from your app's main process file:

    require('update-electron-app')()

By default, this module will check for updates at app startup, then every ten minutes. When an update is found, it will automatically be downloaded in the background. When the download completes, a dialog is displayed allowing the user to restart the app.

If you need to customize your configuration, you can [pass options to `update-electron-app`](https://github.com/electron/update-electron-app) or [use the update service directly](https://github.com/electron/update.electronjs.org).

[Using `electron-builder`](#using-electron-builder)
---------------------------------------------------

If your app is packaged with [`electron-builder`](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

[Deploying an Update Server](#deploying-an-update-server)
---------------------------------------------------------

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

Depending on your needs, you can choose from one of these:

*   [Hazel](https://github.com/zeit/hazel) – Update server for private or open-source apps which can be deployed for free on [Now](https://zeit.co/now). It pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.
*   [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
*   [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
*   [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

[Implementing Updates in Your App](#implementing-updates-in-your-app)
---------------------------------------------------------------------

Once you've deployed your update server, continue with importing the required modules in your code. The following code might vary for different server software, but it works like described when using [Hazel](https://github.com/zeit/hazel).

**Important:** Please ensure that the code below will only be executed in your packaged app, and not in development. You can use [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) to check for the environment.

    const { app, autoUpdater, dialog } = require('electron')

Next, construct the URL of the update server and tell [autoUpdater](/docs/api/auto-updater) about it:

    const server = 'https://your-deployment-url.com'
    const feed = `${server}/update/${process.platform}/${app.getVersion()}`
    
    autoUpdater.setFeedURL(feed)

As the final step, check for updates. The example below will check every minute:

    setInterval(() => {
      autoUpdater.checkForUpdates()
    }, 60000)

Once your application is [packaged](/docs/tutorial/application-distribution), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

[Applying Updates](#applying-updates)
-------------------------------------

Now that you've configured the basic update mechanism for your application, you need to ensure that the user will get notified when there's an update. This can be achieved using the autoUpdater API [events](/docs/api/auto-updater#events):

    autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
      const dialogOpts = {
        type: 'info',
        buttons: ['Restart', 'Later'],
        title: 'Application Update',
        message: process.platform === 'win32' ? releaseNotes : releaseName,
        detail: 'A new version has been downloaded. Restart the application to apply the updates.'
      }
    
      dialog.showMessageBox(dialogOpts, (response) => {
        if (response === 0) autoUpdater.quitAndInstall()
      })
    })

Also make sure that errors are [being handled](/docs/api/auto-updater#event-error). Here's an example for logging them to `stderr`:

    autoUpdater.on('error', message => {
      console.error('There was a problem updating the application')
      console.error(message)
    })

* * *

[Upgrading Chromium](#upgrading-chromium)
=========================================

This is an overview of the steps needed to upgrade Chromium in Electron.

*   Upgrade libcc to a new Chromium version
*   Make Electron code compatible with the new libcc
*   Update Electron dependencies (crashpad, NodeJS, etc.) if needed
*   Make internal builds of libcc and electron
*   Update Electron docs if necessary

[Upgrade `libcc` to a new Chromium version](#upgrade-libcc-to-a-new-chromium-version)
-------------------------------------------------------------------------------------

1.  Get the code and initialize the project:
    
        $ git clone git@github.com:electron/libchromiumcontent.git
        $ cd libchromiumcontent
        $ ./script/bootstrap -v
    
2.  Update the Chromium snapshot

*   Choose a version number from [OmahaProxy](https://omahaproxy.appspot.com/) and update the `VERSION` file with it
    
    *   This can be done manually by visiting OmahaProxy in a browser, or automatically:
    *   One-liner for the latest stable mac version: `curl -so- https://omahaproxy.appspot.com/mac > VERSION`
    *   One-liner for the latest win64 beta version: `curl -so- https://omahaproxy.appspot.com/all | grep "win64,beta" | awk -F, 'NR==1{print $3}' > VERSION`
*   run `$ ./script/update`
    
    *   Brew some tea -- this may run for 30m or more.
    *   It will probably fail applying patches.

3.  Fix `*.patch` files in the `patches/` and `patches-mas/` folders.
4.  (Optional) `script/update` applies patches, but if multiple tries are needed you can manually run the same script that `update` calls: `$ ./script/apply-patches`

*   There is a second script, `script/patch.py` that may be useful. Read `./script/patch.py -h` for more information.

5.  Run the build when all patches can be applied without errors

*   `$ ./script/build`
*   If some patches are no longer compatible with the Chromium code, fix compilation errors.

6.  When the build succeeds, create a `dist` for Electron

*   `$ ./script/create-dist --no_zip`
    
    *   It will create a `dist/main` folder in the libcc repo's root. You will need this to build Electron.

7.  (Optional) Update script contents if there are errors resulting from files that were removed or renamed. (`--no_zip` prevents script from create `dist` archives. You don't need them.)

[Update Electron's code](#update-electrons-code)
------------------------------------------------

1.  Get the code:
    
        $ git clone git@github.com:electron/electron.git
        $ cd electron
    
2.  If you have libcc built on your machine in its own repo, tell Electron to use it:
    
        $ ./script/bootstrap.py -v \
          --libcc_source_path <libcc_folder>/src \
          --libcc_shared_library_path <libcc_folder>/shared_library \
          --libcc_static_library_path <libcc_folder>/static_library
    
3.  If you haven't yet built libcc but it's already supposed to be upgraded to a new Chromium, bootstrap Electron as usual `$ ./script/bootstrap.py -v`

*   Ensure that libcc submodule (`vendor/libchromiumcontent`) points to the right revision

4.  Set `CLANG_REVISION` in `script/update-clang.sh` to match the version Chromium is using.

*   Located in `electron/libchromiumcontent/src/tools/clang/scripts/update.py`

5.  Checkout Chromium if you haven't already:

*   [https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py](https://chromium.googlesource.com/chromium/src.git/+/%7BVERSION%7D/tools/clang/scripts/update.py)
    
    *   (Replace the `{VERSION}` placeholder in the url above to the Chromium version libcc uses.)

6.  Build Electron.

*   Try to build Debug version first: `$ ./script/build.py -c D`
*   You will need it to run tests

7.  Fix compilation and linking errors
8.  Ensure that Release build can be built too

*   `$ ./script/build.py -c R`
*   Often the Release build will have different linking errors that you'll need to fix.
*   Some compilation and linking errors are caused by missing source/object files in the libcc `dist`

9.  Update `./script/create-dist` in the libcc repo, recreate a `dist`, and run Electron bootstrap script once again.

### [Tips for fixing compilation errors](#tips-for-fixing-compilation-errors)

*   Fix build config errors first
*   Fix fatal errors first, like missing files and errors related to compiler flags or defines
*   Try to identify complex errors as soon as possible.
    
    *   Ask for help if you're not sure how to fix them
*   Disable all Electron features, fix the build, then enable them one by one
*   Add more build flags to disable features in build-time.

When a Debug build of Electron succeeds, run the tests: `$ npm run test` Fix the failing tests.

Follow all the steps above to fix Electron code on all supported platforms.

[Updating Crashpad](#updating-crashpad)
---------------------------------------

If there are any compilation errors related to the Crashpad, it probably means you need to update the fork to a newer revision. See [Upgrading Crashpad](/docs/development/upgrading-crashpad) for instructions on how to do that.

[Updating NodeJS](#updating-nodejs)
-----------------------------------

Upgrade `vendor/node` to the Node release that corresponds to the v8 version used in the new Chromium release. See the v8 versions in Node on

See [Upgrading Node](/docs/development/upgrading-node) for instructions on this.

[Verify ffmpeg support](#verify-ffmpeg-support)
-----------------------------------------------

Electron ships with a version of `ffmpeg` that includes proprietary codecs by default. A version without these codecs is built and distributed with each release as well. Each Chrome upgrade should verify that switching this version is still supported.

You can verify Electron's support for multiple `ffmpeg` builds by loading the following page. It should work with the default `ffmpeg` library distributed with Electron and not work with the `ffmpeg` library built without proprietary codecs.

    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Proprietary Codec Check</title>
      </head>
      <body>
        <p>Checking if Electron is using proprietary codecs by loading video from http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p>
        <p id="outcome"></p>
        <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video>
        <script>
          const video = document.querySelector('video')
          video.addEventListener('error', ({ target }) => {
            if (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
              document.querySelector('#outcome').textContent = 'Not using proprietary codecs, video emitted source not supported error event.'
            } else {
              document.querySelector('#outcome').textContent = `Unexpected error: ${target.error.code}`
            }
          })
          video.addEventListener('playing', () => {
            document.querySelector('#outcome').textContent = 'Using proprietary codecs, video started playing.'
          })
        </script>
      </body>
    </html>

[Useful links](#useful-links)
-----------------------------

*   [Chrome Release Schedule](https://www.chromium.org/developers/calendar)
*   [OmahaProxy](http://omahaproxy.appspot.com)
*   [Chromium Issue Tracker](https://bugs.chromium.org/p/chromium)

* * *

[Upgrading Crashpad](#upgrading-crashpad)
=========================================

1.  Get the version of crashpad that we're going to use.

*   `libcc/src/third_party/crashpad/README.chromium` will have a line `Revision:` with a checksum
    
    *   We need to check out the corresponding branch.
*   Clone Google's crashpad ([https://chromium.googlesource.com/crashpad/crashpad](https://chromium.googlesource.com/crashpad/crashpad))
    
    *   `git clone https://chromium.googlesource.com/crashpad/crashpad`
*   Check out the branch with the revision checksum:
    
    *   `git checkout <revision checksum>`
*   Add electron's crashpad fork as a remote
    
    *   `git remote add electron https://github.com/electron/crashpad`
*   Check out a new branch for the update
    
    *   `git checkout -b electron-crashpad-vA.B.C.D`
    *   `A.B.C.D` is the Chromium version found in `libcc/VERSION` and will be something like `62.0.3202.94`

2.  Make a checklist of the Electron patches that need to be applied with `git log --oneline`
    
    *   Or view [https://github.com/electron/crashpad/commits/previous-branch-name](https://github.com/electron/crashpad/commits/previous-branch-name)
3.  For each patch:
    

*   In `electron-crashpad-vA.B.C.D`, cherry-pick the patch's checksum
    
    *   `git cherry-pick <checksum>`
*   Resolve any conflicts
*   Make sure it builds then add, commit, and push work to electron's crashpad fork
    
    *   `git push electron electron-crashpad-vA.B.C.D`

4.  Update Electron to build the new crashpad:

*   `cd vendor/crashpad`
*   `git fetch`
*   `git checkout electron-crashpad-v62.0.3202.94`

5.  Regenerate Ninja files against both targets

*   From Electron root's root, run `script/update.py`
*   `script/build.py -c D --target=crashpad_client`
*   `script/build.py -c D --target=crashpad_handler`
*   Both should build with no errors

6.  Push changes to submodule reference

*   (From electron root) `git add vendor/crashpad`
*   `git push origin upgrade-to-chromium-62`

* * *

[Upgrading Node](#upgrading-node)
=================================

[Discussion](#discussion)
-------------------------

Chromium and Node.js both depend on V8, and Electron contains only a single copy of V8, so it's important to ensure that the version of V8 chosen is compatible with the build's version of Node.js and Chromium.

Upgrading Node is much easier than upgrading Chromium, so fewer conflicts arise if one upgrades Chromium first, then chooses the upstream Node release whose version of V8 is closest to the one Chromium contains.

Electron has its own [Node fork](https://github.com/electron/node) with modifications for the V8 build details mentioned above and for exposing API needed by Electron. Once an upstream Node release is chosen, it's placed in a branch in Electron's Node fork and any Electron Node patches are applied there.

Another factor is that the Node project patches its version of V8. As mentioned above, Electron builds everything with a single copy of V8, so Node's V8 patches must be ported to that copy.

Once all of Electron's dependencies are building and using the same copy of V8, the next step is to fix any Electron code issues caused by the Node upgrade.

\[FIXME\] something about a Node debugger in Atom that we (e.g. deepak) use and need to confirm doesn't break with the Node upgrade?

So in short, the primary steps are:

1.  Update Electron's Node fork to the desired version
2.  Backport Node's V8 patches to our copy of V8
3.  Update the GN build files, porting changes from node's GYP files
4.  Update Electron's DEPS to use new version of Node

[Updating Electron's Node](#updating-electrons-node-fork) [fork](https://github.com/electron/node)
--------------------------------------------------------------------------------------------------

1.  Ensure that `master` on `electron/node` has updated release tags from `nodejs/node`
2.  Create a branch in [https://github.com/electron/node](https://github.com/electron/node): `electron-node-vX.X.X` where the base that you're branching from is the tag for the desired update

*   `vX.X.X` Must use a version of Node compatible with our current version of Chromium

3.  Re-apply our commits from the previous version of Node we were using (`vY.Y.Y`) to `v.X.X.X`

*   Check release tag and select the range of commits we need to re-apply
*   Cherry-pick commit range:
    
    1.  Checkout both `vY.Y.Y` & `v.X.X.X`
    2.  `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
*   Resolve merge conflicts in each file encountered, then:
    
    1.  `git add <conflict-file>`
    2.  `git cherry-pick --continue`
    3.  Repeat until finished

[Updating](#updating-v8-patches) [V8](https://github.com/electron/node/src/V8) Patches
--------------------------------------------------------------------------------------

We need to generate a patch file from each patch that Node applies to V8.

    $ cd third_party/electron_node
    $ CURRENT_NODE_VERSION=vX.Y.Z
    # Find the last commit with the message "deps: update V8 to <some version>"
    # This commit corresponds to Node resetting V8 to its pristine upstream
    # state at the stated version.
    $ LAST_V8_UPDATE="$(git log --grep='^deps: update V8' --format='%H' -1 deps/v8)"
    # This creates a patch file containing all changes in deps/v8 from
    # $LAST_V8_UPDATE up to the current Node version, formatted in a way that
    # it will apply cleanly to the V8 repository (i.e. with `deps/v8`
    # stripped off the path and excluding the v8/gypfiles directory, which
    # isn't present in V8.
    $ git format-patch \
        --relative=deps/v8 \
        $LAST_V8_UPDATE..$CURRENT_NODE_VERSION \
        deps/v8 \
        ':(exclude)deps/v8/gypfiles' \
        --stdout \
        > ../../electron/common/patches/v8/node_v8_patches.patch

This list of patches will probably include one that claims to make the V8 API backwards-compatible with a previous version of V8. Unfortunately, those patches almost always change the V8 API in a way that is incompatible with Chromium.

It's usually easier to update Node to work without the compatibility patch than to update Chromium to work with the compatibility patch, so it's recommended to revert the compatibility patch and fix any errors that arise when compiling Node.

[Update Electron's `DEPS` file](#update-electrons-deps-file)
------------------------------------------------------------

Update the `DEPS` file in the root of [electron/electron](https://github.com/electron/electron) to point to the git hash of the updated Node.

[Notes](#notes)
---------------

*   Node maintains its own fork of V8
    
    *   They backport a small amount of things as needed
    *   Documentation in Node about how [they work with V8](https://nodejs.org/api/v8.html)
*   We update code such that we only use one copy of V8 across all of Electron
    
    *   E.g Electron, Chromium, and Node.js
*   We don’t track upstream closely due to logistics:
    
    *   Upstream uses multiple repos and so merging into a single repo would result in lost history. So we only update when we’re planning a Node version bump in Electron.
*   Chromium is large and time-consuming to update, so we typically choose the Node version based on which of its releases has a version of V8 that’s closest to the version in Chromium that we’re using.
    
    *   We sometimes have to wait for the next periodic Node release because it will sync more closely with the version of V8 in the new Chromium
*   Electron keeps all its patches in the repo because it’s simpler than maintaining different repos for patches for each upstream project.
    
    *   Crashpad, Node.js, Chromium, Skia etc. patches are all kept in the same place
*   Building Node:
    
    *   We maintain our own GN build files for Node.js to make it easier to ensure that eevrything is built with the same compiler flags. This means that every time we upgrade Node.js we have to do a modest amount of work to synchronize the GN files with the upstream GYP files.

* * *

[UploadBlob Object](#uploadblob-object)
=======================================

*   `type` String - `blob`.
*   `blobUUID` String - UUID of blob data to upload.

* * *

[UploadData Object](#uploaddata-object)
=======================================

*   `bytes` Buffer - Content being sent.
*   `file` String - Path of file being uploaded.
*   `blobUUID` String - UUID of blob data. Use [ses.getBlobData](/docs/api/session#sesgetblobdataidentifier-callback) method to retrieve the data.

* * *

[UploadFile Object](#uploadfile-object)
=======================================

*   `type` String - `file`.
*   `filePath` String - Path of file to be uploaded.
*   `offset` Integer - Defaults to `0`.
*   `length` Integer - Number of bytes to read from `offset`. Defaults to `0`.
*   `modificationTime` Double - Last Modification time in number of seconds since the UNIX epoch.

* * *

[UploadRawData Object](#uploadrawdata-object)
=============================================

*   `type` String - `rawData`.
*   `bytes` Buffer - Data to be uploaded.

* * *

[Using Native Node Modules](#using-native-node-modules)
=======================================================

The native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron's headers when building native modules.

[How to install native modules](#how-to-install-native-modules)
---------------------------------------------------------------

Three ways to install native modules:

### [Using `npm`](#using-npm)

By setting a few environment variables, you can use `npm` to install modules directly.

An example of installing all dependencies for Electron:

    # Electron's version.
    export npm_config_target=1.2.3
    # The architecture of Electron, can be ia32 or x64.
    export npm_config_arch=x64
    export npm_config_target_arch=x64
    # Download headers for Electron.
    export npm_config_disturl=https://atom.io/download/electron
    # Tell node-pre-gyp that we are building for Electron.
    export npm_config_runtime=electron
    # Tell node-pre-gyp to build module from source code.
    export npm_config_build_from_source=true
    # Install all dependencies, and store cache to ~/.electron-gyp.
    HOME=~/.electron-gyp npm install

### [Installing modules and rebuilding for Electron](#installing-modules-and-rebuilding-for-electron)

You can also choose to install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild) package. This module can get the version of Electron and handle the manual steps of downloading headers and building native modules for your app.

An example of installing `electron-rebuild` and then rebuild modules with it:

    npm install --save-dev electron-rebuild
    
    # Every time you run "npm install", run this:
    ./node_modules/.bin/electron-rebuild
    
    # On Windows if you have trouble, try:
    .\node_modules\.bin\electron-rebuild.cmd

### [Manually building for Electron](#manually-building-for-electron)

If you are a developer developing a native module and want to test it against Electron, you might want to rebuild the module for Electron manually. You can use `node-gyp` directly to build for Electron:

    cd /path-to-module/
    HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron

The `HOME=~/.electron-gyp` changes where to find development headers. The `--target=1.2.3` is version of Electron. The `--dist-url=...` specifies where to download the headers. The `--arch=x64` says the module is built for 64bit system.

### [Manually building for a custom build of Electron](#manually-building-for-a-custom-build-of-electron)

To compile native Node addons against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

    npm rebuild --nodedir=$HOME/.../path/to/electron/vendor/node

[Troubleshooting](#troubleshooting)
-----------------------------------

If you installed a native module and found it was not working, you need to check following things:

*   The architecture of the module has to match Electron's architecture (ia32 or x64).
*   `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
*   After you upgrade Electron, you usually need to rebuild the modules.
*   When in doubt, run `electron-rebuild` first.

### [A note about `win_delay_load_hook`](#a-note-about-win_delay_load_hook)

On Windows, by default, node-gyp links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll` in Electron 4.x. In order to load native modules on Windows, node-gyp installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

     link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
         "my_addon.obj" "win_delay_load_hook.obj"

In particular, it's important that:

*   you link against `node.lib` from _Electron_ and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
*   you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
*   `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [node-gyp](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

[Modules that rely on `prebuild`](#modules-that-rely-on-prebuild)
-----------------------------------------------------------------

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

[Modules that rely on `node-pre-gyp`](#modules-that-rely-on-node-pre-gyp)
-------------------------------------------------------------------------

The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node, and there are ABI changes, bad things may happen. So in general it is recommended to always build native modules from source code.

If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.

* * *

[Using Pepper Flash Plugin](#using-pepper-flash-plugin)
=======================================================

Electron supports the Pepper Flash plugin. To use the Pepper Flash plugin in Electron, you should manually specify the location of the Pepper Flash plugin and then enable it in your application.

[Prepare a Copy of Flash Plugin](#prepare-a-copy-of-flash-plugin)
-----------------------------------------------------------------

On macOS and Linux, the details of the Pepper Flash plugin can be found by navigating to `chrome://flash` in the Chrome browser. Its location and version are useful for Electron's Pepper Flash support. You can also copy it to another location.

[Add Electron Switch](#add-electron-switch)
-------------------------------------------

You can directly add `--ppapi-flash-path` and `--ppapi-flash-version` to the Electron command line or by using the `app.commandLine.appendSwitch` method before the app ready event. Also, turn on `plugins` option of `BrowserWindow`.

For example:

    const { app, BrowserWindow } = require('electron')
    const path = require('path')
    
    // Specify flash path, supposing it is placed in the same directory with main.js.
    let pluginName
    switch (process.platform) {
      case 'win32':
        pluginName = 'pepflashplayer.dll'
        break
      case 'darwin':
        pluginName = 'PepperFlashPlayer.plugin'
        break
      case 'linux':
        pluginName = 'libpepflashplayer.so'
        break
    }
    app.commandLine.appendSwitch('ppapi-flash-path', path.join(__dirname, pluginName))
    
    // Optional: Specify flash version, for example, v17.0.0.169
    app.commandLine.appendSwitch('ppapi-flash-version', '17.0.0.169')
    
    app.on('ready', () => {
      let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
          plugins: true
        }
      })
      win.loadURL(`file://${__dirname}/index.html`)
      // Something else
    })

You can also try loading the system wide Pepper Flash plugin instead of shipping the plugins yourself, its path can be received by calling `app.getPath('pepperFlashSystemPlugin')`.

[Enable Flash Plugin in a `<webview>` Tag](#enable-flash-plugin-in-a-webview-tag)
---------------------------------------------------------------------------------

Add `plugins` attribute to `<webview>` tag.

    <webview src="https://www.adobe.com/software/flash/about/" plugins></webview>

[Troubleshooting](#troubleshooting)
-----------------------------------

You can check if Pepper Flash plugin was loaded by inspecting `navigator.plugins` in the console of devtools (although you can't know if the plugin's path is correct).

The architecture of Pepper Flash plugin has to match Electron's one. On Windows, a common error is to use 32bit version of Flash plugin against 64bit version of Electron.

On Windows the path passed to `--ppapi-flash-path` has to use `\` as path delimiter, using POSIX-style paths will not work.

For some operations, such as streaming media using RTMP, it is necessary to grant wider permissions to players’ `.swf` files. One way of accomplishing this, is to use [nw-flash-trust](https://github.com/szwacz/nw-flash-trust).

* * *

[Using Selenium and WebDriver](#using-selenium-and-webdriver)
=============================================================

From [ChromeDriver - WebDriver for Chrome](https://sites.google.com/a/chromium.org/chromedriver/):

> WebDriver is an open source tool for automated testing of web apps across many browsers. It provides capabilities for navigating to web pages, user input, JavaScript execution, and more. ChromeDriver is a standalone server which implements WebDriver's wire protocol for Chromium. It is being developed by members of the Chromium and WebDriver teams.

[Setting up Spectron](#setting-up-spectron)
-------------------------------------------

[Spectron](https://electronjs.org/spectron) is the officially supported ChromeDriver testing framework for Electron. It is built on top of [WebdriverIO](http://webdriver.io/) and has helpers to access Electron APIs in your tests and bundles ChromeDriver.

    $ npm install --save-dev spectron

    // A simple test to verify a visible window is opened with a title
    const Application = require('spectron').Application
    const assert = require('assert')
    
    const myApp = new Application({
      path: '/Applications/MyApp.app/Contents/MacOS/MyApp'
    })
    
    const verifyWindowIsVisibleWithTitle = async (app) => {
      await app.start()
      try {
        // Check if the window is visible
        const isVisible = await app.browserWindow.isVisible()
        // Verify the window is visible
        assert.strictEqual(isVisible, true)
        // Get the window's title
        const title = await app.client.getTitle()
        // Verify the window's title
        assert.strictEqual(title, 'My App')
      } catch (error) {
        // Log any failures
        console.error('Test failed', error.message)
      }
      // Stop the application
      await app.stop()
    }
    
    verifyWindowIsVisibleWithTitle(myApp)

[Setting up with WebDriverJs](#setting-up-with-webdriverjs)
-----------------------------------------------------------

[WebDriverJs](https://code.google.com/p/selenium/wiki/WebDriverJs) provides a Node package for testing with web driver, we will use it as an example.

### [1\. Start ChromeDriver](#1-start-chromedriver)

First you need to download the `chromedriver` binary, and run it:

    $ npm install electron-chromedriver
    $ ./node_modules/.bin/chromedriver
    Starting ChromeDriver (v2.10.291558) on port 9515
    Only local connections are allowed.

Remember the port number `9515`, which will be used later

### [2\. Install WebDriverJS](#2-install-webdriverjs)

    $ npm install selenium-webdriver

### [3\. Connect to ChromeDriver](#3-connect-to-chromedriver)

The usage of `selenium-webdriver` with Electron is the same with upstream, except that you have to manually specify how to connect chrome driver and where to find Electron's binary:

    const webdriver = require('selenium-webdriver')
    
    const driver = new webdriver.Builder()
      // The "9515" is the port opened by chrome driver.
      .usingServer('http://localhost:9515')
      .withCapabilities({
        chromeOptions: {
          // Here is the path to your Electron binary.
          binary: '/Path-to-Your-App.app/Contents/MacOS/Electron'
        }
      })
      .forBrowser('electron')
      .build()
    
    driver.get('http://www.google.com')
    driver.findElement(webdriver.By.name('q')).sendKeys('webdriver')
    driver.findElement(webdriver.By.name('btnG')).click()
    driver.wait(() => {
      return driver.getTitle().then((title) => {
        return title === 'webdriver - Google Search'
      })
    }, 1000)
    
    driver.quit()

[Setting up with WebdriverIO](#setting-up-with-webdriverio)
-----------------------------------------------------------

[WebdriverIO](http://webdriver.io/) provides a Node package for testing with web driver.

### [1\. Start ChromeDriver](#1-start-chromedriver)

First you need to download the `chromedriver` binary, and run it:

    $ npm install electron-chromedriver
    $ ./node_modules/.bin/chromedriver --url-base=wd/hub --port=9515
    Starting ChromeDriver (v2.10.291558) on port 9515
    Only local connections are allowed.

Remember the port number `9515`, which will be used later

### [2\. Install WebdriverIO](#2-install-webdriverio)

    $ npm install webdriverio

### [3\. Connect to chrome driver](#3-connect-to-chrome-driver)

    const webdriverio = require('webdriverio')
    const options = {
      host: 'localhost', // Use localhost as chrome driver server
      port: 9515, // "9515" is the port opened by chrome driver.
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          binary: '/Path-to-Your-App/electron', // Path to your Electron binary.
          args: [/* cli arguments */] // Optional, perhaps 'app=' + /path/to/your/app/
        }
      }
    }
    
    let client = webdriverio.remote(options)
    
    client
      .init()
      .url('http://google.com')
      .setValue('#q', 'webdriverio')
      .click('#btnG')
      .getTitle().then((title) => {
        console.log('Title was: ' + title)
      })
      .end()

[Workflow](#workflow)
---------------------

To test your application without rebuilding Electron, [place](https://github.com/electron/electron/blob/master/docs/tutorial/application-distribution.md) your app source into Electron's resource directory.

Alternatively, pass an argument to run with your Electron binary that points to your app's folder. This eliminates the need to copy-paste your app into Electron's resource directory.

* * *

[V8 Development](#v8-development)
=================================

> A collection of resources for learning and using V8

*   [V8 Tracing](https://github.com/v8/v8/wiki/Tracing-V8)
*   [V8 Profiler](https://github.com/v8/v8/wiki/V8-Profiler) - Profiler combinations which are useful for profiling: `--prof`, `--trace-ic`, `--trace-opt`, `--trace-deopt`, `--print-bytecode`, `--print-opt-code`
*   [V8 Interpreter Design](https://docs.google.com/document/d/11T2CRex9hXxoJwbYqVQ32yIPMh0uouUZLdyrtmMoL44/edit?ts=56f27d9d#heading=h.6jz9dj3bnr8t)
*   [Optimizing compiler](https://github.com/v8/v8/wiki/TurboFan)
*   [V8 GDB Debugging](https://github.com/v8/v8/wiki/GDB-JIT-Interface)

See also [Chromium Development](/docs/development/chromium-development)

* * *

[webContents](#webcontents)
===========================

> Render and control web pages.

Process: [Main](/docs/glossary#main-process)

`webContents` is an [EventEmitter](https://nodejs.org/api/events.html#events_class_eventemitter). It is responsible for rendering and controlling a web page and is a property of the [`BrowserWindow`](/docs/api/browser-window) object. An example of accessing the `webContents` object:

    const { BrowserWindow } = require('electron')
    
    let win = new BrowserWindow({ width: 800, height: 1500 })
    win.loadURL('http://github.com')
    
    let contents = win.webContents
    console.log(contents)

[Methods](#methods)
-------------------

These methods can be accessed from the `webContents` module:

    const { webContents } = require('electron')
    console.log(webContents)

### [`webContents.getAllWebContents()`](#webcontentsgetallwebcontents)

Returns `WebContents[]` - An array of all `WebContents` instances. This will contain web contents for all windows, webviews, opened devtools, and devtools extension background pages.

### [`webContents.getFocusedWebContents()`](#webcontentsgetfocusedwebcontents)

Returns `WebContents` - The web contents that is focused in this application, otherwise returns `null`.

### [`webContents.fromId(id)`](#webcontentsfromidid)

*   `id` Integer

Returns `WebContents` - A WebContents instance with the given ID.

[Class: WebContents](#class-webcontents)
----------------------------------------

> Render and control the contents of a BrowserWindow instance.

Process: [Main](/docs/glossary#main-process)

### [Instance Events](#instance-events)

#### [Event: 'did-finish-load'](#event-did-finish-load)

Emitted when the navigation is done, i.e. the spinner of the tab has stopped spinning, and the `onload` event was dispatched.

#### [Event: 'did-fail-load'](#event-did-fail-load)

Returns:

*   `event` Event
*   `errorCode` Integer
*   `errorDescription` String
*   `validatedURL` String
*   `isMainFrame` Boolean
*   `frameProcessId` Integer
*   `frameRoutingId` Integer

This event is like `did-finish-load` but emitted when the load failed or was cancelled, e.g. `window.stop()` is invoked. The full list of error codes and their meaning is available [here](https://code.google.com/p/chromium/codesearch#chromium/src/net/base/net_error_list.h).

#### [Event: 'did-frame-finish-load'](#event-did-frame-finish-load)

Returns:

*   `event` Event
*   `isMainFrame` Boolean
*   `frameProcessId` Integer
*   `frameRoutingId` Integer

Emitted when a frame has done navigation.

#### [Event: 'did-start-loading'](#event-did-start-loading)

Corresponds to the points in time when the spinner of the tab started spinning.

#### [Event: 'did-stop-loading'](#event-did-stop-loading)

Corresponds to the points in time when the spinner of the tab stopped spinning.

#### [Event: 'dom-ready'](#event-dom-ready)

Returns:

*   `event` Event

Emitted when the document in the given frame is loaded.

#### [Event: 'page-favicon-updated'](#event-page-favicon-updated)

Returns:

*   `event` Event
*   `favicons` String\[\] - Array of URLs.

Emitted when page receives favicon urls.

#### [Event: 'new-window'](#event-new-window)

Returns:

*   `event` Event
*   `url` String
*   `frameName` String
*   `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
*   `options` Object - The options which will be used for creating the new [`BrowserWindow`](/docs/api/browser-window).
*   `additionalFeatures` String\[\] - The non-standard features (features not handled by Chromium or Electron) given to `window.open()`.
*   `referrer` [Referrer](/docs/api/structures/referrer) - The referrer that will be passed to the new window. May or may not result in the `Referer` header being sent, depending on the referrer policy.

Emitted when the page requests to open a new window for a `url`. It could be requested by `window.open` or an external link like `<a target='_blank'>`.

By default a new `BrowserWindow` will be created for the `url`.

Calling `event.preventDefault()` will prevent Electron from automatically creating a new [`BrowserWindow`](/docs/api/browser-window). If you call `event.preventDefault()` and manually create a new [`BrowserWindow`](/docs/api/browser-window) then you must set `event.newGuest` to reference the new [`BrowserWindow`](/docs/api/browser-window) instance, failing to do so may result in unexpected behavior. For example:

    myBrowserWindow.webContents.on('new-window', (event, url) => {
      event.preventDefault()
      const win = new BrowserWindow({ show: false })
      win.once('ready-to-show', () => win.show())
      win.loadURL(url)
      event.newGuest = win
    })

#### [Event: 'will-navigate'](#event-will-navigate)

Returns:

*   `event` Event
*   `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `webContents.loadURL` and `webContents.back`.

It is also not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` will prevent the navigation.

#### [Event: 'did-start-navigation'](#event-did-start-navigation)

Returns:

*   `event` Event
*   `url` String
*   `isInPlace` Boolean
*   `isMainFrame` Boolean
*   `frameProcessId` Integer
*   `frameRoutingId` Integer

Emitted when any frame (including main) starts navigating. `isInplace` will be `true` for in-page navigations.

#### [Event: 'will-redirect'](#event-will-redirect)

Returns:

*   `event` Event
*   `url` String
*   `isInPlace` Boolean
*   `isMainFrame` Boolean
*   `frameProcessId` Integer
*   `frameRoutingId` Integer

Emitted as a server side redirect occurs during navigation. For example a 302 redirect.

This event will be emitted after `did-start-navigation` and always before the `did-redirect-navigation` event for the same navigation.

Calling `event.preventDefault()` will prevent the navigation (not just the redirect).

#### [Event: 'did-redirect-navigation'](#event-did-redirect-navigation)

Returns:

*   `event` Event
*   `url` String
*   `isInPlace` Boolean
*   `isMainFrame` Boolean
*   `frameProcessId` Integer
*   `frameRoutingId` Integer

Emitted after a server side redirect occurs during navigation. For example a 302 redirect.

This event can not be prevented, if you want to prevent redirects you should checkout out the `will-redirect` event above.

#### [Event: 'did-navigate'](#event-did-navigate)

Returns:

*   `event` Event
*   `url` String
*   `httpResponseCode` Integer - -1 for non HTTP navigations
*   `httpStatusText` String - empty for non HTTP navigations

Emitted when a main frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### [Event: 'did-frame-navigate'](#event-did-frame-navigate)

Returns:

*   `event` Event
*   `url` String
*   `httpResponseCode` Integer - -1 for non HTTP navigations
*   `httpStatusText` String - empty for non HTTP navigations,
*   `isMainFrame` Boolean
*   `frameProcessId` Integer
*   `frameRoutingId` Integer

Emitted when any frame navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

#### [Event: 'did-navigate-in-page'](#event-did-navigate-in-page)

Returns:

*   `event` Event
*   `url` String
*   `isMainFrame` Boolean
*   `frameProcessId` Integer
*   `frameRoutingId` Integer

Emitted when an in-page navigation happened in any frame.

When in-page navigation happens, the page URL changes but does not cause navigation outside of the page. Examples of this occurring are when anchor links are clicked or when the DOM `hashchange` event is triggered.

#### [Event: 'will-prevent-unload'](#event-will-prevent-unload)

Returns:

*   `event` Event

Emitted when a `beforeunload` event handler is attempting to cancel a page unload.

Calling `event.preventDefault()` will ignore the `beforeunload` event handler and allow the page to be unloaded.

    const { BrowserWindow, dialog } = require('electron')
    const win = new BrowserWindow({ width: 800, height: 600 })
    win.webContents.on('will-prevent-unload', (event) => {
      const choice = dialog.showMessageBox(win, {
        type: 'question',
        buttons: ['Leave', 'Stay'],
        title: 'Do you want to leave this site?',
        message: 'Changes you made may not be saved.',
        defaultId: 0,
        cancelId: 1
      })
      const leave = (choice === 0)
      if (leave) {
        event.preventDefault()
      }
    })

#### [Event: 'crashed'](#event-crashed)

Returns:

*   `event` Event
*   `killed` Boolean

Emitted when the renderer process crashes or is killed.

#### [Event: 'unresponsive'](#event-unresponsive)

Emitted when the web page becomes unresponsive.

#### [Event: 'responsive'](#event-responsive)

Emitted when the unresponsive web page becomes responsive again.

#### [Event: 'plugin-crashed'](#event-plugin-crashed)

Returns:

*   `event` Event
*   `name` String
*   `version` String

Emitted when a plugin process has crashed.

#### [Event: 'destroyed'](#event-destroyed)

Emitted when `webContents` is destroyed.

#### [Event: 'before-input-event'](#event-before-input-event)

Returns:

*   `event` Event
*   `input` Object - Input properties.
    
    *   `type` String - Either `keyUp` or `keyDown`.
    *   `key` String - Equivalent to [KeyboardEvent.key](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
    *   `code` String - Equivalent to [KeyboardEvent.code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
    *   `isAutoRepeat` Boolean - Equivalent to [KeyboardEvent.repeat](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
    *   `shift` Boolean - Equivalent to [KeyboardEvent.shiftKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
    *   `control` Boolean - Equivalent to [KeyboardEvent.controlKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
    *   `alt` Boolean - Equivalent to [KeyboardEvent.altKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).
    *   `meta` Boolean - Equivalent to [KeyboardEvent.metaKey](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent).

Emitted before dispatching the `keydown` and `keyup` events in the page. Calling `event.preventDefault` will prevent the page `keydown`/`keyup` events and the menu shortcuts.

To only prevent the menu shortcuts, use [`setIgnoreMenuShortcuts`](#contentssetignoremenushortcutsignore-experimental):

    const { BrowserWindow } = require('electron')
    
    let win = new BrowserWindow({ width: 800, height: 600 })
    
    win.webContents.on('before-input-event', (event, input) => {
      // For example, only enable application menu keyboard shortcuts when
      // Ctrl/Cmd are down.
      win.webContents.setIgnoreMenuShortcuts(!input.control && !input.meta)
    })

#### [Event: 'devtools-opened'](#event-devtools-opened)

Emitted when DevTools is opened.

#### [Event: 'devtools-closed'](#event-devtools-closed)

Emitted when DevTools is closed.

#### [Event: 'devtools-focused'](#event-devtools-focused)

Emitted when DevTools is focused / opened.

#### [Event: 'certificate-error'](#event-certificate-error)

Returns:

*   `event` Event
*   `url` String
*   `error` String - The error code.
*   `certificate` [Certificate](/docs/api/structures/certificate)
*   `callback` Function
    
    *   `isTrusted` Boolean - Indicates whether the certificate can be considered trusted.

Emitted when failed to verify the `certificate` for `url`.

The usage is the same with [the `certificate-error` event of `app`](/docs/api/app#event-certificate-error).

#### [Event: 'select-client-certificate'](#event-select-client-certificate)

Returns:

*   `event` Event
*   `url` URL
*   `certificateList` [Certificate\[\]](/docs/api/structures/certificate)
*   `callback` Function
    
    *   `certificate` [Certificate](/docs/api/structures/certificate) - Must be a certificate from the given list.

Emitted when a client certificate is requested.

The usage is the same with [the `select-client-certificate` event of `app`](/docs/api/app#event-select-client-certificate).

#### [Event: 'login'](#event-login)

Returns:

*   `event` Event
*   `request` Object
    
    *   `method` String
    *   `url` URL
    *   `referrer` URL
*   `authInfo` Object
    
    *   `isProxy` Boolean
    *   `scheme` String
    *   `host` String
    *   `port` Integer
    *   `realm` String
*   `callback` Function
    
    *   `username` String
    *   `password` String

Emitted when `webContents` wants to do basic auth.

The usage is the same with [the `login` event of `app`](/docs/api/app#event-login).

#### [Event: 'found-in-page'](#event-found-in-page)

Returns:

*   `event` Event
*   `result` Object
    
    *   `requestId` Integer
    *   `activeMatchOrdinal` Integer - Position of the active match.
    *   `matches` Integer - Number of Matches.
    *   `selectionArea` Object - Coordinates of first match region.
    *   `finalUpdate` Boolean

Emitted when a result is available for \[`webContents.findInPage`\] request.

#### [Event: 'media-started-playing'](#event-media-started-playing)

Emitted when media starts playing.

#### [Event: 'media-paused'](#event-media-paused)

Emitted when media is paused or done playing.

#### [Event: 'did-change-theme-color'](#event-did-change-theme-color)

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

    <meta name='theme-color' content='#ff0000'>

Returns:

*   `event` Event
*   `color` (String | null) - Theme color is in format of '#rrggbb'. It is `null` when no theme color is set.

#### [Event: 'update-target-url'](#event-update-target-url)

Returns:

*   `event` Event
*   `url` String

Emitted when mouse moves over a link or the keyboard moves the focus to a link.

#### [Event: 'cursor-changed'](#event-cursor-changed)

Returns:

*   `event` Event
*   `type` String
*   `image` [NativeImage](/docs/api/native-image) (optional)
*   `scale` Float (optional) - scaling factor for the custom cursor.
*   `size` [Size](/docs/api/structures/size) (optional) - the size of the `image`.
*   `hotspot` [Point](/docs/api/structures/point) (optional) - coordinates of the custom cursor's hotspot.

Emitted when the cursor's type changes. The `type` parameter can be `default`, `crosshair`, `pointer`, `text`, `wait`, `help`, `e-resize`, `n-resize`, `ne-resize`, `nw-resize`, `s-resize`, `se-resize`, `sw-resize`, `w-resize`, `ns-resize`, `ew-resize`, `nesw-resize`, `nwse-resize`, `col-resize`, `row-resize`, `m-panning`, `e-panning`, `n-panning`, `ne-panning`, `nw-panning`, `s-panning`, `se-panning`, `sw-panning`, `w-panning`, `move`, `vertical-text`, `cell`, `context-menu`, `alias`, `progress`, `nodrop`, `copy`, `none`, `not-allowed`, `zoom-in`, `zoom-out`, `grab`, `grabbing` or `custom`.

If the `type` parameter is `custom`, the `image` parameter will hold the custom cursor image in a [`NativeImage`](/docs/api/native-image), and `scale`, `size` and `hotspot` will hold additional information about the custom cursor.

#### [Event: 'context-menu'](#event-context-menu)

Returns:

*   `event` Event
*   `params` Object
    
    *   `x` Integer - x coordinate.
    *   `y` Integer - y coordinate.
    *   `linkURL` String - URL of the link that encloses the node the context menu was invoked on.
    *   `linkText` String - Text associated with the link. May be an empty string if the contents of the link are an image.
    *   `pageURL` String - URL of the top level page that the context menu was invoked on.
    *   `frameURL` String - URL of the subframe that the context menu was invoked on.
    *   `srcURL` String - Source URL for the element that the context menu was invoked on. Elements with source URLs are images, audio and video.
    *   `mediaType` String - Type of the node the context menu was invoked on. Can be `none`, `image`, `audio`, `video`, `canvas`, `file` or `plugin`.
    *   `hasImageContents` Boolean - Whether the context menu was invoked on an image which has non-empty contents.
    *   `isEditable` Boolean - Whether the context is editable.
    *   `selectionText` String - Text of the selection that the context menu was invoked on.
    *   `titleText` String - Title or alt text of the selection that the context was invoked on.
    *   `misspelledWord` String - The misspelled word under the cursor, if any.
    *   `frameCharset` String - The character encoding of the frame on which the menu was invoked.
    *   `inputFieldType` String - If the context menu was invoked on an input field, the type of that field. Possible values are `none`, `plainText`, `password`, `other`.
    *   `menuSourceType` String - Input source that invoked the context menu. Can be `none`, `mouse`, `keyboard`, `touch` or `touchMenu`.
    *   `mediaFlags` Object - The flags for the media element the context menu was invoked on.
        
        *   `inError` Boolean - Whether the media element has crashed.
        *   `isPaused` Boolean - Whether the media element is paused.
        *   `isMuted` Boolean - Whether the media element is muted.
        *   `hasAudio` Boolean - Whether the media element has audio.
        *   `isLooping` Boolean - Whether the media element is looping.
        *   `isControlsVisible` Boolean - Whether the media element's controls are visible.
        *   `canToggleControls` Boolean - Whether the media element's controls are toggleable.
        *   `canRotate` Boolean - Whether the media element can be rotated.
    *   `editFlags` Object - These flags indicate whether the renderer believes it is able to perform the corresponding action.
        
        *   `canUndo` Boolean - Whether the renderer believes it can undo.
        *   `canRedo` Boolean - Whether the renderer believes it can redo.
        *   `canCut` Boolean - Whether the renderer believes it can cut.
        *   `canCopy` Boolean - Whether the renderer believes it can copy
        *   `canPaste` Boolean - Whether the renderer believes it can paste.
        *   `canDelete` Boolean - Whether the renderer believes it can delete.
        *   `canSelectAll` Boolean - Whether the renderer believes it can select all.

Emitted when there is a new context menu that needs to be handled.

#### [Event: 'select-bluetooth-device'](#event-select-bluetooth-device)

Returns:

*   `event` Event
*   `devices` [BluetoothDevice\[\]](/docs/api/structures/bluetooth-device)
*   `callback` Function
    
    *   `deviceId` String

Emitted when bluetooth device needs to be selected on call to `navigator.bluetooth.requestDevice`. To use `navigator.bluetooth` api `webBluetooth` should be enabled. If `event.preventDefault` is not called, first available device will be selected. `callback` should be called with `deviceId` to be selected, passing empty string to `callback` will cancel the request.

    const { app, BrowserWindow } = require('electron')
    
    let win = null
    app.commandLine.appendSwitch('enable-experimental-web-platform-features')
    
    app.on('ready', () => {
      win = new BrowserWindow({ width: 800, height: 600 })
      win.webContents.on('select-bluetooth-device', (event, deviceList, callback) => {
        event.preventDefault()
        let result = deviceList.find((device) => {
          return device.deviceName === 'test'
        })
        if (!result) {
          callback('')
        } else {
          callback(result.deviceId)
        }
      })
    })

#### [Event: 'paint'](#event-paint)

Returns:

*   `event` Event
*   `dirtyRect` [Rectangle](/docs/api/structures/rectangle)
*   `image` [NativeImage](/docs/api/native-image) - The image data of the whole frame.

Emitted when a new frame is generated. Only the dirty area is passed in the buffer.

    const { BrowserWindow } = require('electron')
    
    let win = new BrowserWindow({ webPreferences: { offscreen: true } })
    win.webContents.on('paint', (event, dirty, image) => {
      // updateBitmap(dirty, image.getBitmap())
    })
    win.loadURL('http://github.com')

#### [Event: 'devtools-reload-page'](#event-devtools-reload-page)

Emitted when the devtools window instructs the webContents to reload

#### [Event: 'will-attach-webview'](#event-will-attach-webview)

Returns:

*   `event` Event
*   `webPreferences` Object - The web preferences that will be used by the guest page. This object can be modified to adjust the preferences for the guest page.
*   `params` Object - The other `<webview>` parameters such as the `src` URL. This object can be modified to adjust the parameters of the guest page.

Emitted when a `<webview>`'s web contents is being attached to this web contents. Calling `event.preventDefault()` will destroy the guest page.

This event can be used to configure `webPreferences` for the `webContents` of a `<webview>` before it's loaded, and provides the ability to set settings that can't be set via `<webview>` attributes.

**Note:** The specified `preload` script option will be appear as `preloadURL` (not `preload`) in the `webPreferences` object emitted with this event.

#### [Event: 'did-attach-webview'](#event-did-attach-webview)

Returns:

*   `event` Event
*   `webContents` WebContents - The guest web contents that is used by the `<webview>`.

Emitted when a `<webview>` has been attached to this web contents.

#### [Event: 'console-message'](#event-console-message)

Returns:

*   `event` Event
*   `level` Integer
*   `message` String
*   `line` Integer
*   `sourceId` String

Emitted when the associated window logs a console message. Will not be emitted for windows with _offscreen rendering_ enabled.

#### [Event: 'remote-require'](#event-remote-require)

Returns:

*   `event` Event
*   `moduleName` String

Emitted when `remote.require()` is called in the renderer process. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

#### [Event: 'remote-get-global'](#event-remote-get-global)

Returns:

*   `event` Event
*   `globalName` String

Emitted when `remote.getGlobal()` is called in the renderer process. Calling `event.preventDefault()` will prevent the global from being returned. Custom value can be returned by setting `event.returnValue`.

#### [Event: 'remote-get-builtin'](#event-remote-get-builtin)

Returns:

*   `event` Event
*   `moduleName` String

Emitted when `remote.getBuiltin()` is called in the renderer process. Calling `event.preventDefault()` will prevent the module from being returned. Custom value can be returned by setting `event.returnValue`.

#### [Event: 'remote-get-current-window'](#event-remote-get-current-window)

Returns:

*   `event` Event

Emitted when `remote.getCurrentWindow()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

#### [Event: 'remote-get-current-web-contents'](#event-remote-get-current-web-contents)

Returns:

*   `event` Event

Emitted when `remote.getCurrentWebContents()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

#### [Event: 'remote-get-guest-web-contents'](#event-remote-get-guest-web-contents)

Returns:

*   `event` Event
*   `guestWebContents` [WebContents](/docs/api/web-contents)

Emitted when `<webview>.getWebContents()` is called in the renderer process. Calling `event.preventDefault()` will prevent the object from being returned. Custom value can be returned by setting `event.returnValue`.

### [Instance Methods](#instance-methods)

#### [`contents.loadURL(url[, options])`](#contentsloadurlurl-options)

*   `url` String
*   `options` Object (optional)
    
    *   `httpReferrer` (String | [Referrer](/docs/api/structures/referrer)) (optional) - An HTTP Referrer url.
    *   `userAgent` String (optional) - A user agent originating the request.
    *   `extraHeaders` String (optional) - Extra headers separated by "\\n".
    *   `postData` ([UploadRawData\[\]](/docs/api/structures/upload-raw-data) | [UploadFile\[\]](/docs/api/structures/upload-file) | [UploadBlob\[\]](/docs/api/structures/upload-blob)) (optional)
    *   `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Loads the `url` in the window. The `url` must contain the protocol prefix, e.g. the `http://` or `file://`. If the load should bypass http cache then use the `pragma` header to achieve it.

    const { webContents } = require('electron')
    const options = { extraHeaders: 'pragma: no-cache\n' }
    webContents.loadURL('https://github.com', options)

#### [`contents.loadFile(filePath[, options])`](#contentsloadfilefilepath-options)

*   `filePath` String
*   `options` Object (optional)
    
    *   `query` Object (optional) - Passed to `url.format()`.
    *   `search` String (optional) - Passed to `url.format()`.
    *   `hash` String (optional) - Passed to `url.format()`.

Loads the given file in the window, `filePath` should be a path to an HTML file relative to the root of your application. For instance an app structure like this:

    | root
    | - package.json
    | - src
    |   - main.js
    |   - index.html

Would require code like this

    win.loadFile('src/index.html')

#### [`contents.downloadURL(url)`](#contentsdownloadurlurl)

*   `url` String

Initiates a download of the resource at `url` without navigating. The `will-download` event of `session` will be triggered.

#### [`contents.getURL()`](#contentsgeturl)

Returns `String` - The URL of the current web page.

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow({ width: 800, height: 600 })
    win.loadURL('http://github.com')
    
    let currentURL = win.webContents.getURL()
    console.log(currentURL)

#### [`contents.getTitle()`](#contentsgettitle)

Returns `String` - The title of the current web page.

#### [`contents.isDestroyed()`](#contentsisdestroyed)

Returns `Boolean` - Whether the web page is destroyed.

#### [`contents.focus()`](#contentsfocus)

Focuses the web page.

#### [`contents.isFocused()`](#contentsisfocused)

Returns `Boolean` - Whether the web page is focused.

#### [`contents.isLoading()`](#contentsisloading)

Returns `Boolean` - Whether web page is still loading resources.

#### [`contents.isLoadingMainFrame()`](#contentsisloadingmainframe)

Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.

#### [`contents.isWaitingForResponse()`](#contentsiswaitingforresponse)

Returns `Boolean` - Whether the web page is waiting for a first-response from the main resource of the page.

#### [`contents.stop()`](#contentsstop)

Stops any pending navigation.

#### [`contents.reload()`](#contentsreload)

Reloads the current web page.

#### [`contents.reloadIgnoringCache()`](#contentsreloadignoringcache)

Reloads current page and ignores cache.

#### [`contents.canGoBack()`](#contentscangoback)

Returns `Boolean` - Whether the browser can go back to previous web page.

#### [`contents.canGoForward()`](#contentscangoforward)

Returns `Boolean` - Whether the browser can go forward to next web page.

#### [`contents.canGoToOffset(offset)`](#contentscangotooffsetoffset)

*   `offset` Integer

Returns `Boolean` - Whether the web page can go to `offset`.

#### [`contents.clearHistory()`](#contentsclearhistory)

Clears the navigation history.

#### [`contents.goBack()`](#contentsgoback)

Makes the browser go back a web page.

#### [`contents.goForward()`](#contentsgoforward)

Makes the browser go forward a web page.

#### [`contents.goToIndex(index)`](#contentsgotoindexindex)

*   `index` Integer

Navigates browser to the specified absolute web page index.

#### [`contents.goToOffset(offset)`](#contentsgotooffsetoffset)

*   `offset` Integer

Navigates to the specified offset from the "current entry".

#### [`contents.isCrashed()`](#contentsiscrashed)

Returns `Boolean` - Whether the renderer process has crashed.

#### [`contents.setUserAgent(userAgent)`](#contentssetuseragentuseragent)

*   `userAgent` String

Overrides the user agent for this web page.

#### [`contents.getUserAgent()`](#contentsgetuseragent)

Returns `String` - The user agent for this web page.

#### [`contents.insertCSS(css)`](#contentsinsertcsscss)

*   `css` String

Injects CSS into the current web page.

#### [`contents.executeJavaScript(code[, userGesture, callback])`](#contentsexecutejavascriptcode-usergesture-callback)

*   `code` String
*   `userGesture` Boolean (optional) - Default is `false`.
*   `callback` Function (optional) - Called after script has been executed.
    
    *   `result` Any

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

If the result of the executed code is a promise the callback result will be the resolved value of the promise. We recommend that you use the returned Promise to handle code that results in a Promise.

    contents.executeJavaScript('fetch("https://jsonplaceholder.typicode.com/users/1").then(resp => resp.json())', true)
      .then((result) => {
        console.log(result) // Will be the JSON object from the fetch call
      })

#### [`contents.setIgnoreMenuShortcuts(ignore)` _Experimental_](#contentssetignoremenushortcutsignore-experimental)

*   `ignore` Boolean

Ignore application menu shortcuts while this web contents is focused.

#### [`contents.setAudioMuted(muted)`](#contentssetaudiomutedmuted)

*   `muted` Boolean

Mute the audio on the current web page.

#### [`contents.isAudioMuted()`](#contentsisaudiomuted)

Returns `Boolean` - Whether this page has been muted.

#### [`contents.isCurrentlyAudible()`](#contentsiscurrentlyaudible)

Returns `Boolean` - Whether audio is currently playing.

#### [`contents.setZoomFactor(factor)`](#contentssetzoomfactorfactor)

*   `factor` Number - Zoom factor.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

#### [`contents.getZoomFactor(callback)`](#contentsgetzoomfactorcallback)

*   `callback` Function
    
    *   `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

#### [`contents.setZoomLevel(level)`](#contentssetzoomlevellevel)

*   `level` Number - Zoom level.

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

#### [`contents.getZoomLevel(callback)`](#contentsgetzoomlevelcallback)

*   `callback` Function
    
    *   `zoomLevel` Number

Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.

#### [`contents.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`](#contentssetvisualzoomlevellimitsminimumlevel-maximumlevel)

*   `minimumLevel` Number
*   `maximumLevel` Number

Sets the maximum and minimum pinch-to-zoom level.

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
>     contents.setVisualZoomLevelLimits(1, 3)

#### [`contents.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`](#contentssetlayoutzoomlevellimitsminimumlevel-maximumlevel)

*   `minimumLevel` Number
*   `maximumLevel` Number

Sets the maximum and minimum layout-based (i.e. non-visual) zoom level.

#### [`contents.undo()`](#contentsundo)

Executes the editing command `undo` in web page.

#### [`contents.redo()`](#contentsredo)

Executes the editing command `redo` in web page.

#### [`contents.cut()`](#contentscut)

Executes the editing command `cut` in web page.

#### [`contents.copy()`](#contentscopy)

Executes the editing command `copy` in web page.

#### [`contents.copyImageAt(x, y)`](#contentscopyimageatx-y)

*   `x` Integer
*   `y` Integer

Copy the image at the given position to the clipboard.

#### [`contents.paste()`](#contentspaste)

Executes the editing command `paste` in web page.

#### [`contents.pasteAndMatchStyle()`](#contentspasteandmatchstyle)

Executes the editing command `pasteAndMatchStyle` in web page.

#### [`contents.delete()`](#contentsdelete)

Executes the editing command `delete` in web page.

#### [`contents.selectAll()`](#contentsselectall)

Executes the editing command `selectAll` in web page.

#### [`contents.unselect()`](#contentsunselect)

Executes the editing command `unselect` in web page.

#### [`contents.replace(text)`](#contentsreplacetext)

*   `text` String

Executes the editing command `replace` in web page.

#### [`contents.replaceMisspelling(text)`](#contentsreplacemisspellingtext)

*   `text` String

Executes the editing command `replaceMisspelling` in web page.

#### [`contents.insertText(text)`](#contentsinserttexttext)

*   `text` String

Inserts `text` to the focused element.

#### [`contents.findInPage(text[, options])`](#contentsfindinpagetext-options)

*   `text` String - Content to be searched, must not be empty.
*   `options` Object (optional)
    
    *   `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
    *   `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
    *   `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
    *   `wordStart` Boolean (optional) (Deprecated) - Whether to look only at the start of words. defaults to `false`.
    *   `medialCapitalAsWordStart` Boolean (optional) (Deprecated) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Accepts several other intra-word matches, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](/docs/api/web-contents#event-found-in-page) event.

#### [`contents.stopFindInPage(action)`](#contentsstopfindinpageaction)

*   `action` String - Specifies the action to take place when ending \[`webContents.findInPage`\] request.
    
    *   `clearSelection` - Clear the selection.
    *   `keepSelection` - Translate the selection into a normal selection.
    *   `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webContents` with the provided `action`.

    const { webContents } = require('electron')
    webContents.on('found-in-page', (event, result) => {
      if (result.finalUpdate) webContents.stopFindInPage('clearSelection')
    })
    
    const requestId = webContents.findInPage('api')
    console.log(requestId)

#### [`contents.capturePage([rect, ]callback)`](#contentscapturepagerect-callback)

*   `rect` [Rectangle](/docs/api/structures/rectangle) (optional) - The area of the page to be captured.
*   `callback` Function
    
    *   `image` [NativeImage](/docs/api/native-image)

Captures a snapshot of the page within `rect`. Upon completion `callback` will be called with `callback(image)`. The `image` is an instance of [NativeImage](/docs/api/native-image) that stores data of the snapshot. Omitting `rect` will capture the whole visible page.

#### [`contents.hasServiceWorker(callback)`](#contentshasserviceworkercallback)

*   `callback` Function
    
    *   `hasWorker` Boolean

Checks if any ServiceWorker is registered and returns a boolean as response to `callback`.

#### [`contents.unregisterServiceWorker(callback)`](#contentsunregisterserviceworkercallback)

*   `callback` Function
    
    *   `success` Boolean

Unregisters any ServiceWorker if present and returns a boolean as response to `callback` when the JS promise is fulfilled or false when the JS promise is rejected.

#### [`contents.getPrinters()`](#contentsgetprinters)

Get the system printer list.

Returns [`PrinterInfo[]`](/docs/api/structures/printer-info).

#### [`contents.print([options], [callback])`](#contentsprintoptions-callback)

*   `options` Object (optional)
    
    *   `silent` Boolean (optional) - Don't ask user for print settings. Default is `false`.
    *   `printBackground` Boolean (optional) - Also prints the background color and image of the web page. Default is `false`.
    *   `deviceName` String (optional) - Set the printer device name to use. Default is `''`.
*   `callback` Function (optional)
    
    *   `success` Boolean - Indicates success of the print call.

Prints window's web page. When `silent` is set to `true`, Electron will pick the system's default printer if `deviceName` is empty and the default settings for printing.

Calling `window.print()` in web page is equivalent to calling `webContents.print({ silent: false, printBackground: false, deviceName: '' })`.

Use `page-break-before: always;` CSS style to force to print to a new page.

#### [`contents.printToPDF(options, callback)`](#contentsprinttopdfoptions-callback)

*   `options` Object
    
    *   `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
    *   `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
    *   `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
    *   `printSelectionOnly` Boolean (optional) - Whether to print selection only.
    *   `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
*   `callback` Function
    
    *   `error` Error
    *   `data` Buffer

Prints window's web page as PDF with Chromium's preview printing custom settings.

The `callback` will be called with `callback(error, data)` on completion. The `data` is a `Buffer` that contains the generated PDF data.

The `landscape` will be ignored if `@page` CSS at-rule is used in the web page.

By default, an empty `options` will be regarded as:

    {
      marginsType: 0,
      printBackground: false,
      printSelectionOnly: false,
      landscape: false
    }

Use `page-break-before: always;` CSS style to force to print to a new page.

An example of `webContents.printToPDF`:

    const { BrowserWindow } = require('electron')
    const fs = require('fs')
    
    let win = new BrowserWindow({ width: 800, height: 600 })
    win.loadURL('http://github.com')
    
    win.webContents.on('did-finish-load', () => {
      // Use default printing options
      win.webContents.printToPDF({}, (error, data) => {
        if (error) throw error
        fs.writeFile('/tmp/print.pdf', data, (error) => {
          if (error) throw error
          console.log('Write PDF successfully.')
        })
      })
    })

#### [`contents.addWorkSpace(path)`](#contentsaddworkspacepath)

*   `path` String

Adds the specified path to DevTools workspace. Must be used after DevTools creation:

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow()
    win.webContents.on('devtools-opened', () => {
      win.webContents.addWorkSpace(__dirname)
    })

#### [`contents.removeWorkSpace(path)`](#contentsremoveworkspacepath)

*   `path` String

Removes the specified path from DevTools workspace.

#### [`contents.setDevToolsWebContents(devToolsWebContents)`](#contentssetdevtoolswebcontentsdevtoolswebcontents)

*   `devToolsWebContents` WebContents

Uses the `devToolsWebContents` as the target `WebContents` to show devtools.

The `devToolsWebContents` must not have done any navigation, and it should not be used for other purposes after the call.

By default Electron manages the devtools by creating an internal `WebContents` with native view, which developers have very limited control of. With the `setDevToolsWebContents` method, developers can use any `WebContents` to show the devtools in it, including `BrowserWindow`, `BrowserView` and `<webview>` tag.

Note that closing the devtools does not destroy the `devToolsWebContents`, it is caller's responsibility to destroy `devToolsWebContents`.

An example of showing devtools in a `<webview>` tag:

    <html>
    <head>
      <style type="text/css">
        * { margin: 0; }
        #browser { height: 70%; }
        #devtools { height: 30%; }
      </style>
    </head>
    <body>
      <webview id="browser" src="https://github.com"></webview>
      <webview id="devtools"></webview>
      <script>
        const browserView = document.getElementById('browser')
        const devtoolsView = document.getElementById('devtools')
        browserView.addEventListener('dom-ready', () => {
          const browser = browserView.getWebContents()
          browser.setDevToolsWebContents(devtoolsView.getWebContents())
          browser.openDevTools()
        })
      </script>
    </body>
    </html>

An example of showing devtools in a `BrowserWindow`:

    const { app, BrowserWindow } = require('electron')
    
    let win = null
    let devtools = null
    
    app.once('ready', () => {
      win = new BrowserWindow()
      devtools = new BrowserWindow()
      win.loadURL('https://github.com')
      win.webContents.setDevToolsWebContents(devtools.webContents)
      win.webContents.openDevTools({ mode: 'detach' })
    })

#### [`contents.openDevTools([options])`](#contentsopendevtoolsoptions)

*   `options` Object (optional)
    
    *   `mode` String - Opens the devtools with specified dock state, can be `right`, `bottom`, `undocked`, `detach`. Defaults to last used dock state. In `undocked` mode it's possible to dock back. In `detach` mode it's not.

Opens the devtools.

When `contents` is a `<webview>` tag, the `mode` would be `detach` by default, explicitly passing an empty `mode` can force using last used dock state.

#### [`contents.closeDevTools()`](#contentsclosedevtools)

Closes the devtools.

#### [`contents.isDevToolsOpened()`](#contentsisdevtoolsopened)

Returns `Boolean` - Whether the devtools is opened.

#### [`contents.isDevToolsFocused()`](#contentsisdevtoolsfocused)

Returns `Boolean` - Whether the devtools view is focused .

#### [`contents.toggleDevTools()`](#contentstoggledevtools)

Toggles the developer tools.

#### [`contents.inspectElement(x, y)`](#contentsinspectelementx-y)

*   `x` Integer
*   `y` Integer

Starts inspecting element at position (`x`, `y`).

#### [`contents.inspectServiceWorker()`](#contentsinspectserviceworker)

Opens the developer tools for the service worker context.

#### [`contents.send(channel[, arg1][, arg2][, ...])`](#contentssendchannel-arg1-arg2-)

*   `channel` String
*   `...args` any\[\]

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. Arguments will be serialized in JSON internally and hence no functions or prototype chain will be included.

The renderer process can handle the message by listening to `channel` with the [`ipcRenderer`](/docs/api/ipc-renderer) module.

An example of sending messages from the main process to the renderer process:

    // In the main process.
    const { app, BrowserWindow } = require('electron')
    let win = null
    
    app.on('ready', () => {
      win = new BrowserWindow({ width: 800, height: 600 })
      win.loadURL(`file://${__dirname}/index.html`)
      win.webContents.on('did-finish-load', () => {
        win.webContents.send('ping', 'whoooooooh!')
      })
    })

    <!-- index.html -->
    <html>
    <body>
      <script>
        require('electron').ipcRenderer.on('ping', (event, message) => {
          console.log(message) // Prints 'whoooooooh!'
        })
      </script>
    </body>
    </html>

#### [`contents.enableDeviceEmulation(parameters)`](#contentsenabledeviceemulationparameters)

*   `parameters` Object
    
    *   `screenPosition` String - Specify the screen type to emulate (default: `desktop`):
        
        *   `desktop` - Desktop screen type.
        *   `mobile` - Mobile screen type.
    *   `screenSize` [Size](/docs/api/structures/size) - Set the emulated screen size (screenPosition == mobile).
    *   `viewPosition` [Point](/docs/api/structures/point) - Position the view on the screen (screenPosition == mobile) (default: `{ x: 0, y: 0 }`).
    *   `deviceScaleFactor` Integer - Set the device scale factor (if zero defaults to original device scale factor) (default: `0`).
    *   `viewSize` [Size](/docs/api/structures/size) - Set the emulated view size (empty means no override)
    *   `scale` Float - Scale of emulated view inside available space (not in fit to view mode) (default: `1`).

Enable device emulation with the given parameters.

#### [`contents.disableDeviceEmulation()`](#contentsdisabledeviceemulation)

Disable device emulation enabled by `webContents.enableDeviceEmulation`.

#### [`contents.sendInputEvent(event)`](#contentssendinputeventevent)

*   `event` Object
    
    *   `type` String (**required**) - The type of the event, can be `mouseDown`, `mouseUp`, `mouseEnter`, `mouseLeave`, `contextMenu`, `mouseWheel`, `mouseMove`, `keyDown`, `keyUp` or `char`.
    *   `modifiers` String\[\] - An array of modifiers of the event, can include `shift`, `control`, `alt`, `meta`, `isKeypad`, `isAutoRepeat`, `leftButtonDown`, `middleButtonDown`, `rightButtonDown`, `capsLock`, `numLock`, `left`, `right`.

Sends an input `event` to the page. **Note:** The [`BrowserWindow`](/docs/api/browser-window) containing the contents needs to be focused for `sendInputEvent()` to work.

For keyboard events, the `event` object also have following properties:

*   `keyCode` String (**required**) - The character that will be sent as the keyboard event. Should only use the valid key codes in [Accelerator](/docs/api/accelerator).

For mouse events, the `event` object also have following properties:

*   `x` Integer (**required**)
*   `y` Integer (**required**)
*   `button` String - The button pressed, can be `left`, `middle`, `right`.
*   `globalX` Integer
*   `globalY` Integer
*   `movementX` Integer
*   `movementY` Integer
*   `clickCount` Integer

For the `mouseWheel` event, the `event` object also have following properties:

*   `deltaX` Integer
*   `deltaY` Integer
*   `wheelTicksX` Integer
*   `wheelTicksY` Integer
*   `accelerationRatioX` Integer
*   `accelerationRatioY` Integer
*   `hasPreciseScrollingDeltas` Boolean
*   `canScroll` Boolean

#### [`contents.beginFrameSubscription([onlyDirty ,]callback)`](#contentsbeginframesubscriptiononlydirty-callback)

*   `onlyDirty` Boolean (optional) - Defaults to `false`.
*   `callback` Function
    
    *   `image` [NativeImage](/docs/api/native-image)
    *   `dirtyRect` [Rectangle](/docs/api/structures/rectangle)

Begin subscribing for presentation events and captured frames, the `callback` will be called with `callback(image, dirtyRect)` when there is a presentation event.

The `image` is an instance of [NativeImage](/docs/api/native-image) that stores the captured frame.

The `dirtyRect` is an object with `x, y, width, height` properties that describes which part of the page was repainted. If `onlyDirty` is set to `true`, `image` will only contain the repainted area. `onlyDirty` defaults to `false`.

#### [`contents.endFrameSubscription()`](#contentsendframesubscription)

End subscribing for frame presentation events.

#### [`contents.startDrag(item)`](#contentsstartdragitem)

*   `item` Object
    
    *   `file` String or `files` Array - The path(s) to the file(s) being dragged.
    *   `icon` [NativeImage](/docs/api/native-image) - The image must be non-empty on macOS.

Sets the `item` as dragging item for current drag-drop operation, `file` is the absolute path of the file to be dragged, and `icon` is the image showing under the cursor when dragging.

#### [`contents.savePage(fullPath, saveType, callback)`](#contentssavepagefullpath-savetype-callback)

*   `fullPath` String - The full file path.
*   `saveType` String - Specify the save type.
    
    *   `HTMLOnly` - Save only the HTML of the page.
    *   `HTMLComplete` - Save complete-html page.
    *   `MHTML` - Save complete-html page as MHTML.
*   `callback` Function - `(error) => {}`.
    
    *   `error` Error

Returns `Boolean` - true if the process of saving page has been initiated successfully.

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow()
    
    win.loadURL('https://github.com')
    
    win.webContents.on('did-finish-load', () => {
      win.webContents.savePage('/tmp/test.html', 'HTMLComplete', (error) => {
        if (!error) console.log('Save page successfully')
      })
    })

#### [`contents.showDefinitionForSelection()` _macOS_](#contentsshowdefinitionforselection-macos)

Shows pop-up dictionary that searches the selected word on the page.

#### [`contents.isOffscreen()`](#contentsisoffscreen)

Returns `Boolean` - Indicates whether _offscreen rendering_ is enabled.

#### [`contents.startPainting()`](#contentsstartpainting)

If _offscreen rendering_ is enabled and not painting, start painting.

#### [`contents.stopPainting()`](#contentsstoppainting)

If _offscreen rendering_ is enabled and painting, stop painting.

#### [`contents.isPainting()`](#contentsispainting)

Returns `Boolean` - If _offscreen rendering_ is enabled returns whether it is currently painting.

#### [`contents.setFrameRate(fps)`](#contentssetframeratefps)

*   `fps` Integer

If _offscreen rendering_ is enabled sets the frame rate to the specified number. Only values between 1 and 60 are accepted.

#### [`contents.getFrameRate()`](#contentsgetframerate)

Returns `Integer` - If _offscreen rendering_ is enabled returns the current frame rate.

#### [`contents.invalidate()`](#contentsinvalidate)

Schedules a full repaint of the window this web contents is in.

If _offscreen rendering_ is enabled invalidates the frame and generates a new one through the `'paint'` event.

#### [`contents.getWebRTCIPHandlingPolicy()`](#contentsgetwebrtciphandlingpolicy)

Returns `String` - Returns the WebRTC IP Handling Policy.

#### [`contents.setWebRTCIPHandlingPolicy(policy)`](#contentssetwebrtciphandlingpolicypolicy)

*   `policy` String - Specify the WebRTC IP Handling Policy.
    
    *   `default` - Exposes user's public and local IPs. This is the default behavior. When this policy is used, WebRTC has the right to enumerate all interfaces and bind them to discover public interfaces.
    *   `default_public_interface_only` - Exposes user's public IP, but does not expose user's local IP. When this policy is used, WebRTC should only use the default route used by http. This doesn't expose any local addresses.
    *   `default_public_and_private_interfaces` - Exposes user's public and local IPs. When this policy is used, WebRTC should only use the default route used by http. This also exposes the associated default private address. Default route is the route chosen by the OS on a multi-homed endpoint.
    *   `disable_non_proxied_udp` - Does not expose public or local IPs. When this policy is used, WebRTC should only use TCP to contact peers or servers unless the proxy server supports UDP.

Setting the WebRTC IP handling policy allows you to control which IPs are exposed via WebRTC. See [BrowserLeaks](https://browserleaks.com/webrtc) for more details.

#### [`contents.getOSProcessId()`](#contentsgetosprocessid)

Returns `Integer` - The operating system `pid` of the associated renderer process.

#### [`contents.getProcessId()`](#contentsgetprocessid)

Returns `Integer` - The Chromium internal `pid` of the associated renderer. Can be compared to the `frameProcessId` passed by frame specific navigation events (e.g. `did-frame-navigate`)

#### [`contents.takeHeapSnapshot(filePath)`](#contentstakeheapsnapshotfilepath)

*   `filePath` String - Path to the output file.

Returns `Promise<void>` - Indicates whether the snapshot has been created successfully.

Takes a V8 heap snapshot and saves it to `filePath`.

#### [`contents.setBackgroundThrottling(allowed)`](#contentssetbackgroundthrottlingallowed)

*   `allowed` Boolean

Controls whether or not this WebContents will throttle animations and timers when the page becomes backgrounded. This also affects the Page Visibility API.

#### [`contents.getType()`](#contentsgettype)

Returns `String` - the type of the webContent. Can be `backgroundPage`, `window`, `browserView`, `remote`, `webview` or `offscreen`.

### [Instance Properties](#instance-properties)

#### [`contents.id`](#contentsid)

A `Integer` representing the unique ID of this WebContents.

#### [`contents.session`](#contentssession)

A [`Session`](/docs/api/session) used by this webContents.

#### [`contents.hostWebContents`](#contentshostwebcontents)

A [`WebContents`](/docs/api/web-contents) instance that might own this `WebContents`.

#### [`contents.devToolsWebContents`](#contentsdevtoolswebcontents)

A `WebContents` of DevTools for this `WebContents`.

**Note:** Users should never store this object because it may become `null` when the DevTools has been closed.

#### [`contents.debugger`](#contentsdebugger)

A [Debugger](/docs/api/debugger) instance for this webContents.

* * *

[webFrame](#webframe)
=====================

> Customize the rendering of the current web page.

Process: [Renderer](/docs/glossary#renderer-process)

`webFrame` export of the Electron module is an instance of the `WebFrame` class representing the top frame of the current `BrowserWindow`. Sub-frames can be retrieved by certain properties and methods (e.g. `webFrame.firstChild`).

An example of zooming current page to 200%.

    const { webFrame } = require('electron')
    
    webFrame.setZoomFactor(2)

[Methods](#methods)
-------------------

The `WebFrame` class has the following instance methods:

### [`webFrame.setZoomFactor(factor)`](#webframesetzoomfactorfactor)

*   `factor` Number - Zoom factor.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

### [`webFrame.getZoomFactor()`](#webframegetzoomfactor)

Returns `Number` - The current zoom factor.

### [`webFrame.setZoomLevel(level)`](#webframesetzoomlevellevel)

*   `level` Number - Zoom level.

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively.

### [`webFrame.getZoomLevel()`](#webframegetzoomlevel)

Returns `Number` - The current zoom level.

### [`webFrame.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`](#webframesetvisualzoomlevellimitsminimumlevel-maximumlevel)

*   `minimumLevel` Number
*   `maximumLevel` Number

Sets the maximum and minimum pinch-to-zoom level.

> **NOTE**: Visual zoom is disabled by default in Electron. To re-enable it, call:
> 
>     webFrame.setVisualZoomLevelLimits(1, 3)

### [`webFrame.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`](#webframesetlayoutzoomlevellimitsminimumlevel-maximumlevel)

*   `minimumLevel` Number
*   `maximumLevel` Number

Sets the maximum and minimum layout-based (i.e. non-visual) zoom level.

### [`webFrame.setSpellCheckProvider(language, autoCorrectWord, provider)`](#webframesetspellcheckproviderlanguage-autocorrectword-provider)

*   `language` String
*   `autoCorrectWord` Boolean
*   `provider` Object
    
    *   `spellCheck` Function - Returns `Boolean`.
        
        *   `text` String

Sets a provider for spell checking in input fields and text areas.

The `provider` must be an object that has a `spellCheck` method that returns whether the word passed is correctly spelled.

An example of using [node-spellchecker](https://github.com/atom/node-spellchecker) as provider:

    const { webFrame } = require('electron')
    webFrame.setSpellCheckProvider('en-US', true, {
      spellCheck (text) {
        return !(require('spellchecker').isMisspelled(text))
      }
    })

### [`webFrame.registerURLSchemeAsBypassingCSP(scheme)`](#webframeregisterurlschemeasbypassingcspscheme)

*   `scheme` String

Resources will be loaded from this `scheme` regardless of the current page's Content Security Policy.

### [`webFrame.registerURLSchemeAsPrivileged(scheme[, options])`](#webframeregisterurlschemeasprivilegedscheme-options)

*   `scheme` String
*   `options` Object (optional)
    
    *   `secure` Boolean (optional) - Default true.
    *   `bypassCSP` Boolean (optional) - Default true.
    *   `allowServiceWorkers` Boolean (optional) - Default true.
    *   `supportFetchAPI` Boolean (optional) - Default true.
    *   `corsEnabled` Boolean (optional) - Default true.

Registers the `scheme` as secure, bypasses content security policy for resources, allows registering ServiceWorker and supports fetch API.

Specify an option with the value of `false` to omit it from the registration. An example of registering a privileged scheme, without bypassing Content Security Policy:

    const { webFrame } = require('electron')
    webFrame.registerURLSchemeAsPrivileged('foo', { bypassCSP: false })

### [`webFrame.insertText(text)`](#webframeinserttexttext)

*   `text` String

Inserts `text` to the focused element.

### [`webFrame.executeJavaScript(code[, userGesture, callback])`](#webframeexecutejavascriptcode-usergesture-callback)

*   `code` String
*   `userGesture` Boolean (optional) - Default is `false`.
*   `callback` Function (optional) - Called after script has been executed.
    
    *   `result` Any

Returns `Promise<any>` - A promise that resolves with the result of the executed code or is rejected if the result of the code is a rejected promise.

Evaluates `code` in page.

In the browser window some HTML APIs like `requestFullScreen` can only be invoked by a gesture from the user. Setting `userGesture` to `true` will remove this limitation.

### [`webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])`](#webframeexecutejavascriptinisolatedworldworldid-scripts-usergesture-callback)

*   `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. You can provide any integer here.
*   `scripts` [WebSource\[\]](/docs/api/structures/web-source)
*   `userGesture` Boolean (optional) - Default is `false`.
*   `callback` Function (optional) - Called after script has been executed.
    
    *   `result` Any

Work like `executeJavaScript` but evaluates `scripts` in an isolated context.

### [`webFrame.setIsolatedWorldContentSecurityPolicy(worldId, csp)`](#webframesetisolatedworldcontentsecuritypolicyworldid-csp)

*   `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. You can provide any integer here.
*   `csp` String

Set the content security policy of the isolated world.

### [`webFrame.setIsolatedWorldHumanReadableName(worldId, name)`](#webframesetisolatedworldhumanreadablenameworldid-name)

*   `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. You can provide any integer here.
*   `name` String

Set the name of the isolated world. Useful in devtools.

### [`webFrame.setIsolatedWorldSecurityOrigin(worldId, securityOrigin)`](#webframesetisolatedworldsecurityoriginworldid-securityorigin)

*   `worldId` Integer - The ID of the world to run the javascript in, `0` is the default world, `999` is the world used by Electrons `contextIsolation` feature. You can provide any integer here.
*   `securityOrigin` String

Set the security origin of the isolated world.

### [`webFrame.getResourceUsage()`](#webframegetresourceusage)

Returns `Object`:

*   `images` [MemoryUsageDetails](/docs/api/structures/memory-usage-details)
*   `scripts` [MemoryUsageDetails](/docs/api/structures/memory-usage-details)
*   `cssStyleSheets` [MemoryUsageDetails](/docs/api/structures/memory-usage-details)
*   `xslStyleSheets` [MemoryUsageDetails](/docs/api/structures/memory-usage-details)
*   `fonts` [MemoryUsageDetails](/docs/api/structures/memory-usage-details)
*   `other` [MemoryUsageDetails](/docs/api/structures/memory-usage-details)

Returns an object describing usage information of Blink's internal memory caches.

    const { webFrame } = require('electron')
    console.log(webFrame.getResourceUsage())

This will generate:

    {
      images: {
        count: 22,
        size: 2549,
        liveSize: 2542
      },
      cssStyleSheets: { /* same with "images" */ },
      xslStyleSheets: { /* same with "images" */ },
      fonts: { /* same with "images" */ },
      other: { /* same with "images" */ }
    }

### [`webFrame.clearCache()`](#webframeclearcache)

Attempts to free memory that is no longer being used (like images from a previous navigation).

Note that blindly calling this method probably makes Electron slower since it will have to refill these emptied caches, you should only call it if an event in your app has occurred that makes you think your page is actually using less memory (i.e. you have navigated from a super heavy page to a mostly empty one, and intend to stay there).

### [`webFrame.getFrameForSelector(selector)`](#webframegetframeforselectorselector)

*   `selector` String - CSS selector for a frame element.

Returns `WebFrame` - The frame element in `webFrame's` document selected by `selector`, `null` would be returned if `selector` does not select a frame or if the frame is not in the current renderer process.

### [`webFrame.findFrameByName(name)`](#webframefindframebynamename)

*   `name` String

Returns `WebFrame` - A child of `webFrame` with the supplied `name`, `null` would be returned if there's no such frame or if the frame is not in the current renderer process.

### [`webFrame.findFrameByRoutingId(routingId)`](#webframefindframebyroutingidroutingid)

*   `routingId` Integer - An `Integer` representing the unique frame id in the current renderer process. Routing IDs can be retrieved from `WebFrame` instances (`webFrame.routingId`) and are also passed by frame specific `WebContents` navigation events (e.g. `did-frame-navigate`)

Returns `WebFrame` - that has the supplied `routingId`, `null` if not found.

[Properties](#properties)
-------------------------

### [`webFrame.top`](#webframetop)

A `WebFrame` representing top frame in frame hierarchy to which `webFrame` belongs, the property would be `null` if top frame is not in the current renderer process.

### [`webFrame.opener`](#webframeopener)

A `WebFrame` representing the frame which opened `webFrame`, the property would be `null` if there's no opener or opener is not in the current renderer process.

### [`webFrame.parent`](#webframeparent)

A `WebFrame` representing parent frame of `webFrame`, the property would be `null` if `webFrame` is top or parent is not in the current renderer process.

### [`webFrame.firstChild`](#webframefirstchild)

A `WebFrame` representing the first child frame of `webFrame`, the property would be `null` if `webFrame` has no children or if first child is not in the current renderer process.

### [`webFrame.nextSibling`](#webframenextsibling)

A `WebFrame` representing next sibling frame, the property would be `null` if `webFrame` is the last frame in its parent or if the next sibling is not in the current renderer process.

### [`webFrame.routingId`](#webframeroutingid)

An `Integer` representing the unique frame id in the current renderer process. Distinct WebFrame instances that refer to the same underlying frame will have the same `routingId`.

* * *

[Class: WebRequest](#class-webrequest)
--------------------------------------

> Intercept and modify the contents of a request at various stages of its lifetime.

Process: [Main](/docs/glossary#main-process)

Instances of the `WebRequest` class are accessed by using the `webRequest` property of a `Session`.

The methods of `WebRequest` accept an optional `filter` and a `listener`. The `listener` will be called with `listener(details)` when the API's event has happened. The `details` object describes the request.

⚠️ Only the last attached `listener` will be used. Passing `null` as `listener` will unsubscribe from the event.

The `filter` object has a `urls` property which is an Array of URL patterns that will be used to filter out the requests that do not match the URL patterns. If the `filter` is omitted then all requests will be matched.

For certain events the `listener` is passed with a `callback`, which should be called with a `response` object when `listener` has done its work.

An example of adding `User-Agent` header for requests:

    const { session } = require('electron')
    
    // Modify the user agent for all requests to the following urls.
    const filter = {
      urls: ['https://*.github.com/*', '*://electron.github.io']
    }
    
    session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
      details.requestHeaders['User-Agent'] = 'MyAgent'
      callback({ requestHeaders: details.requestHeaders })
    })

### [Instance Methods](#instance-methods)

The following methods are available on instances of `WebRequest`:

#### [`webRequest.onBeforeRequest([filter, ]listener)`](#webrequestonbeforerequestfilter-listener)

*   `filter` Object (optional)
    
    *   `urls` String\[\] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
*   `listener` Function
    
    *   `details` Object
        
        *   `id` Integer
        *   `url` String
        *   `method` String
        *   `webContentsId` Integer (optional)
        *   `resourceType` String
        *   `timestamp` Double
        *   `uploadData` [UploadData\[\]](/docs/api/structures/upload-data)
    *   `callback` Function
        
        *   `response` Object
            
            *   `cancel` Boolean (optional)
            *   `redirectURL` String (optional) - The original request is prevented from being sent or completed and is instead redirected to the given URL.

The `listener` will be called with `listener(details, callback)` when a request is about to occur.

The `uploadData` is an array of `UploadData` objects.

The `callback` has to be called with an `response` object.

#### [`webRequest.onBeforeSendHeaders([filter, ]listener)`](#webrequestonbeforesendheadersfilter-listener)

*   `filter` Object (optional)
    
    *   `urls` String\[\] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
*   `listener` Function
    
    *   `details` Object
        
        *   `id` Integer
        *   `url` String
        *   `method` String
        *   `webContentsId` Integer (optional)
        *   `resourceType` String
        *   `timestamp` Double
        *   `requestHeaders` Object
    *   `callback` Function
        
        *   `response` Object _`cancel` Boolean (optional)_ `requestHeaders` Object (optional) - When provided, request will be made with these headers.

The `listener` will be called with `listener(details, callback)` before sending an HTTP request, once the request headers are available. This may occur after a TCP connection is made to the server, but before any http data is sent.

The `callback` has to be called with an `response` object.

#### [`webRequest.onSendHeaders([filter, ]listener)`](#webrequestonsendheadersfilter-listener)

*   `filter` Object (optional)
    
    *   `urls` String\[\] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
*   `listener` Function
    
    *   `details` Object
        
        *   `id` Integer
        *   `url` String
        *   `method` String
        *   `webContentsId` Integer (optional)
        *   `resourceType` String
        *   `timestamp` Double
        *   `requestHeaders` Object

The `listener` will be called with `listener(details)` just before a request is going to be sent to the server, modifications of previous `onBeforeSendHeaders` response are visible by the time this listener is fired.

#### [`webRequest.onHeadersReceived([filter, ]listener)`](#webrequestonheadersreceivedfilter-listener)

*   `filter` Object (optional)
    
    *   `urls` String\[\] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
*   `listener` Function
    
    *   `details` Object
        
        *   `id` Integer
        *   `url` String
        *   `method` String
        *   `webContentsId` Integer (optional)
        *   `resourceType` String
        *   `timestamp` Double
        *   `statusLine` String
        *   `statusCode` Integer
        *   `responseHeaders` Object
    *   `callback` Function
        
        *   `response` Object
            
            *   `cancel` Boolean (optional)
            *   `responseHeaders` Object (optional) - When provided, the server is assumed to have responded with these headers.
            *   `statusLine` String (optional) - Should be provided when overriding `responseHeaders` to change header status otherwise original response header's status will be used.

The `listener` will be called with `listener(details, callback)` when HTTP response headers of a request have been received.

The `callback` has to be called with an `response` object.

#### [`webRequest.onResponseStarted([filter, ]listener)`](#webrequestonresponsestartedfilter-listener)

*   `filter` Object (optional)
    
    *   `urls` String\[\] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
*   `listener` Function
    
    *   `details` Object
        
        *   `id` Integer
        *   `url` String
        *   `method` String
        *   `webContentsId` Integer (optional)
        *   `resourceType` String
        *   `timestamp` Double
        *   `responseHeaders` Object
        *   `fromCache` Boolean - Indicates whether the response was fetched from disk cache.
        *   `statusCode` Integer
        *   `statusLine` String

The `listener` will be called with `listener(details)` when first byte of the response body is received. For HTTP requests, this means that the status line and response headers are available.

#### [`webRequest.onBeforeRedirect([filter, ]listener)`](#webrequestonbeforeredirectfilter-listener)

*   `filter` Object (optional)
    
    *   `urls` String\[\] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
*   `listener` Function
    
    *   `details` Object
        
        *   `id` Integer
        *   `url` String
        *   `method` String
        *   `webContentsId` Integer (optional)
        *   `resourceType` String
        *   `timestamp` Double
        *   `redirectURL` String
        *   `statusCode` Integer
        *   `ip` String (optional) - The server IP address that the request was actually sent to.
        *   `fromCache` Boolean
        *   `responseHeaders` Object

The `listener` will be called with `listener(details)` when a server initiated redirect is about to occur.

#### [`webRequest.onCompleted([filter, ]listener)`](#webrequestoncompletedfilter-listener)

*   `filter` Object (optional)
    
    *   `urls` String\[\] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
*   `listener` Function
    
    *   `details` Object
        
        *   `id` Integer
        *   `url` String
        *   `method` String
        *   `webContentsId` Integer (optional)
        *   `resourceType` String
        *   `referrer` String
        *   `timestamp` Double
        *   `responseHeaders` Object
        *   `fromCache` Boolean
        *   `statusCode` Integer
        *   `statusLine` String

The `listener` will be called with `listener(details)` when a request is completed.

#### [`webRequest.onErrorOccurred([filter, ]listener)`](#webrequestonerroroccurredfilter-listener)

*   `filter` Object (optional)
    
    *   `urls` String\[\] - Array of URL patterns that will be used to filter out the requests that do not match the URL patterns.
*   `listener` Function
    
    *   `details` Object
        
        *   `id` Integer
        *   `url` String
        *   `method` String
        *   `webContentsId` Integer (optional)
        *   `resourceType` String
        *   `timestamp` Double
        *   `fromCache` Boolean
        *   `error` String - The error description.

The `listener` will be called with `listener(details)` when an error occurs.

* * *

[WebSource Object](#websource-object)
=====================================

*   `code` String
*   `url` String (optional)
*   `startLine` Integer (optional) - Default is 1.

* * *

[`<webview>` Tag](#webview-tag)
===============================

[Warning](#warning)
-------------------

Electron's `webview` tag is based on [Chromium's `webview`](https://developer.chrome.com/apps/tags/webview), which is undergoing dramatic architectural changes. This impacts the stability of `webviews`, including rendering, navigation, and event routing. We currently recommend to not use the `webview` tag and to consider alternatives, like `iframe`, Electron's `BrowserView`, or an architecture that avoids embedded content altogether.

[Overview](#overview)
---------------------

> Display external web content in an isolated frame and process.

Process: [Renderer](/docs/glossary#renderer-process)

Use the `webview` tag to embed 'guest' content (such as web pages) in your Electron app. The guest content is contained within the `webview` container. An embedded page within your app controls how the guest content is laid out and rendered.

Unlike an `iframe`, the `webview` runs in a separate process than your app. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content. **Note:** Most methods called on the webview from the host page require a synchronous call to the main process.

[Example](#example)
-------------------

To embed a web page in your app, add the `webview` tag to your app's embedder page (this is the app page that will display the guest content). In its simplest form, the `webview` tag includes the `src` of the web page and css styles that control the appearance of the `webview` container:

    <webview id="foo" src="https://www.github.com/" style="display:inline-flex; width:640px; height:480px"></webview>

If you want to control the guest content in any way, you can write JavaScript that listens for `webview` events and responds to those events using the `webview` methods. Here's sample code with two event listeners: one that listens for the web page to start loading, the other for the web page to stop loading, and displays a "loading..." message during the load time:

    <script>
      onload = () => {
        const webview = document.querySelector('webview')
        const indicator = document.querySelector('.indicator')
    
        const loadstart = () => {
          indicator.innerText = 'loading...'
        }
    
        const loadstop = () => {
          indicator.innerText = ''
        }
    
        webview.addEventListener('did-start-loading', loadstart)
        webview.addEventListener('did-stop-loading', loadstop)
      }
    </script>

[Internal implementation](#internal-implementation)
---------------------------------------------------

Under the hood `webview` is implemented with [Out-of-Process iframes (OOPIFs)](https://www.chromium.org/developers/design-documents/oop-iframes). The `webview` tag is essentially a custom element using shadow DOM to wrap an `iframe` element inside it.

So the behavior of `webview` is very similar to a cross-domain `iframe`, as examples:

*   When clicking into a `webview`, the page focus will move from the embedder frame to `webview`.
*   You can not add keyboard event listeners to `webview`.
*   All reactions between the embedder frame and `webview` are asynchronous.

[CSS Styling Notes](#css-styling-notes)
---------------------------------------

Please note that the `webview` tag's style uses `display:flex;` internally to ensure the child `iframe` element fills the full height and width of its `webview` container when used with traditional and flexbox layouts. Please do not overwrite the default `display:flex;` CSS property, unless specifying `display:inline-flex;` for inline layout.

[Tag Attributes](#tag-attributes)
---------------------------------

The `webview` tag has the following attributes:

### [`src`](#src)

    <webview src="https://www.github.com/"></webview>

Returns the visible URL. Writing to this attribute initiates top-level navigation.

Assigning `src` its own value will reload the current page.

The `src` attribute can also accept data URLs, such as `data:text/plain,Hello, world!`.

### [`autosize`](#autosize)

    <webview src="https://www.github.com/" autosize minwidth="576" minheight="432"></webview>

When this attribute is present the `webview` container will automatically resize within the bounds specified by the attributes `minwidth`, `minheight`, `maxwidth`, and `maxheight`. These constraints do not impact the `webview` unless `autosize` is enabled. When `autosize` is enabled, the `webview` container size cannot be less than the minimum values or greater than the maximum.

### [`nodeintegration`](#nodeintegration)

    <webview src="http://www.google.com/" nodeintegration></webview>

When this attribute is present the guest page in `webview` will have node integration and can use node APIs like `require` and `process` to access low level system resources. Node integration is disabled by default in the guest page.

### [`enableremotemodule`](#enableremotemodule)

    <webview src="http://www.google.com/" enableremotemodule="false"></webview>

When this attribute is `false` the guest page in `webview` will not have access to the [`remote`](/docs/api/remote) module. The remote module is avaiable by default.

### [`plugins`](#plugins)

    <webview src="https://www.github.com/" plugins></webview>

When this attribute is present the guest page in `webview` will be able to use browser plugins. Plugins are disabled by default.

### [`preload`](#preload)

    <webview src="https://www.github.com/" preload="./test.js"></webview>

Specifies a script that will be loaded before other scripts run in the guest page. The protocol of script's URL must be either `file:` or `asar:`, because it will be loaded by `require` in guest page under the hood.

When the guest page doesn't have node integration this script will still have access to all Node APIs, but global objects injected by Node will be deleted after this script has finished executing.

**Note:** This option will be appear as `preloadURL` (not `preload`) in the `webPreferences` specified to the `will-attach-webview` event.

### [`httpreferrer`](#httpreferrer)

    <webview src="https://www.github.com/" httpreferrer="http://cheng.guru"></webview>

Sets the referrer URL for the guest page.

### [`useragent`](#useragent)

    <webview src="https://www.github.com/" useragent="Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; AS; rv:11.0) like Gecko"></webview>

Sets the user agent for the guest page before the page is navigated to. Once the page is loaded, use the `setUserAgent` method to change the user agent.

### [`disablewebsecurity`](#disablewebsecurity)

    <webview src="https://www.github.com/" disablewebsecurity></webview>

When this attribute is present the guest page will have web security disabled. Web security is enabled by default.

### [`partition`](#partition)

    <webview src="https://github.com" partition="persist:github"></webview>
    <webview src="https://electronjs.org" partition="electron"></webview>

Sets the session used by the page. If `partition` starts with `persist:`, the page will use a persistent session available to all pages in the app with the same `partition`. if there is no `persist:` prefix, the page will use an in-memory session. By assigning the same `partition`, multiple pages can share the same session. If the `partition` is unset then default session of the app will be used.

This value can only be modified before the first navigation, since the session of an active renderer process cannot change. Subsequent attempts to modify the value will fail with a DOM exception.

### [`allowpopups`](#allowpopups)

    <webview src="https://www.github.com/" allowpopups></webview>

When this attribute is present the guest page will be allowed to open new windows. Popups are disabled by default.

### [`webpreferences`](#webpreferences)

    <webview src="https://github.com" webpreferences="allowRunningInsecureContent, javascript=no"></webview>

A list of strings which specifies the web preferences to be set on the webview, separated by `,`. The full list of supported preference strings can be found in [BrowserWindow](/docs/api/browser-window#new-browserwindowoptions).

The string follows the same format as the features string in `window.open`. A name by itself is given a `true` boolean value. A preference can be set to another value by including an `=`, followed by the value. Special values `yes` and `1` are interpreted as `true`, while `no` and `0` are interpreted as `false`.

### [`enableblinkfeatures`](#enableblinkfeatures)

    <webview src="https://www.github.com/" enableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>

A list of strings which specifies the blink features to be enabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

### [`disableblinkfeatures`](#disableblinkfeatures)

    <webview src="https://www.github.com/" disableblinkfeatures="PreciseMemoryInfo, CSSVariables"></webview>

A list of strings which specifies the blink features to be disabled separated by `,`. The full list of supported feature strings can be found in the [RuntimeEnabledFeatures.json5](https://cs.chromium.org/chromium/src/third_party/blink/renderer/platform/runtime_enabled_features.json5?l=70) file.

[Methods](#methods)
-------------------

The `webview` tag has the following methods:

**Note:** The webview element must be loaded before using the methods.

**Example**

    const webview = document.querySelector('webview')
    webview.addEventListener('dom-ready', () => {
      webview.openDevTools()
    })

### [`<webview>.loadURL(url[, options])`](#webviewloadurlurl-options)

*   `url` URL
*   `options` Object (optional)
    
    *   `httpReferrer` (String | [Referrer](/docs/api/structures/referrer)) (optional) - An HTTP Referrer url.
    *   `userAgent` String (optional) - A user agent originating the request.
    *   `extraHeaders` String (optional) - Extra headers separated by "\\n"
    *   `postData` ([UploadRawData\[\]](/docs/api/structures/upload-raw-data) | [UploadFile\[\]](/docs/api/structures/upload-file) | [UploadBlob\[\]](/docs/api/structures/upload-blob)) (optional)
    *   `baseURLForDataURL` String (optional) - Base url (with trailing path separator) for files to be loaded by the data url. This is needed only if the specified `url` is a data url and needs to load other files.

Loads the `url` in the webview, the `url` must contain the protocol prefix, e.g. the `http://` or `file://`.

### [`<webview>.downloadURL(url)`](#webviewdownloadurlurl)

*   `url` String

Initiates a download of the resource at `url` without navigating.

### [`<webview>.getURL()`](#webviewgeturl)

Returns `String` - The URL of guest page.

### [`<webview>.getTitle()`](#webviewgettitle)

Returns `String` - The title of guest page.

### [`<webview>.isLoading()`](#webviewisloading)

Returns `Boolean` - Whether guest page is still loading resources.

### [`<webview>.isLoadingMainFrame()`](#webviewisloadingmainframe)

Returns `Boolean` - Whether the main frame (and not just iframes or frames within it) is still loading.

### [`<webview>.isWaitingForResponse()`](#webviewiswaitingforresponse)

Returns `Boolean` - Whether the guest page is waiting for a first-response for the main resource of the page.

### [`<webview>.stop()`](#webviewstop)

Stops any pending navigation.

### [`<webview>.reload()`](#webviewreload)

Reloads the guest page.

### [`<webview>.reloadIgnoringCache()`](#webviewreloadignoringcache)

Reloads the guest page and ignores cache.

### [`<webview>.canGoBack()`](#webviewcangoback)

Returns `Boolean` - Whether the guest page can go back.

### [`<webview>.canGoForward()`](#webviewcangoforward)

Returns `Boolean` - Whether the guest page can go forward.

### [`<webview>.canGoToOffset(offset)`](#webviewcangotooffsetoffset)

*   `offset` Integer

Returns `Boolean` - Whether the guest page can go to `offset`.

### [`<webview>.clearHistory()`](#webviewclearhistory)

Clears the navigation history.

### [`<webview>.goBack()`](#webviewgoback)

Makes the guest page go back.

### [`<webview>.goForward()`](#webviewgoforward)

Makes the guest page go forward.

### [`<webview>.goToIndex(index)`](#webviewgotoindexindex)

*   `index` Integer

Navigates to the specified absolute index.

### [`<webview>.goToOffset(offset)`](#webviewgotooffsetoffset)

*   `offset` Integer

Navigates to the specified offset from the "current entry".

### [`<webview>.isCrashed()`](#webviewiscrashed)

Returns `Boolean` - Whether the renderer process has crashed.

### [`<webview>.setUserAgent(userAgent)`](#webviewsetuseragentuseragent)

*   `userAgent` String

Overrides the user agent for the guest page.

### [`<webview>.getUserAgent()`](#webviewgetuseragent)

Returns `String` - The user agent for guest page.

### [`<webview>.insertCSS(css)`](#webviewinsertcsscss)

*   `css` String

Injects CSS into the guest page.

### [`<webview>.executeJavaScript(code[, userGesture, callback])`](#webviewexecutejavascriptcode-usergesture-callback)

*   `code` String
*   `userGesture` Boolean (optional) - Default `false`.
*   `callback` Function (optional) - Called after script has been executed.
    
    *   `result` Any

Evaluates `code` in page. If `userGesture` is set, it will create the user gesture context in the page. HTML APIs like `requestFullScreen`, which require user action, can take advantage of this option for automation.

### [`<webview>.openDevTools()`](#webviewopendevtools)

Opens a DevTools window for guest page.

### [`<webview>.closeDevTools()`](#webviewclosedevtools)

Closes the DevTools window of guest page.

### [`<webview>.isDevToolsOpened()`](#webviewisdevtoolsopened)

Returns `Boolean` - Whether guest page has a DevTools window attached.

### [`<webview>.isDevToolsFocused()`](#webviewisdevtoolsfocused)

Returns `Boolean` - Whether DevTools window of guest page is focused.

### [`<webview>.inspectElement(x, y)`](#webviewinspectelementx-y)

*   `x` Integer
*   `y` Integer

Starts inspecting element at position (`x`, `y`) of guest page.

### [`<webview>.inspectServiceWorker()`](#webviewinspectserviceworker)

Opens the DevTools for the service worker context present in the guest page.

### [`<webview>.setAudioMuted(muted)`](#webviewsetaudiomutedmuted)

*   `muted` Boolean

Set guest page muted.

### [`<webview>.isAudioMuted()`](#webviewisaudiomuted)

Returns `Boolean` - Whether guest page has been muted.

### [`<webview>.isCurrentlyAudible()`](#webviewiscurrentlyaudible)

Returns `Boolean` - Whether audio is currently playing.

### [`<webview>.undo()`](#webviewundo)

Executes editing command `undo` in page.

### [`<webview>.redo()`](#webviewredo)

Executes editing command `redo` in page.

### [`<webview>.cut()`](#webviewcut)

Executes editing command `cut` in page.

### [`<webview>.copy()`](#webviewcopy)

Executes editing command `copy` in page.

### [`<webview>.paste()`](#webviewpaste)

Executes editing command `paste` in page.

### [`<webview>.pasteAndMatchStyle()`](#webviewpasteandmatchstyle)

Executes editing command `pasteAndMatchStyle` in page.

### [`<webview>.delete()`](#webviewdelete)

Executes editing command `delete` in page.

### [`<webview>.selectAll()`](#webviewselectall)

Executes editing command `selectAll` in page.

### [`<webview>.unselect()`](#webviewunselect)

Executes editing command `unselect` in page.

### [`<webview>.replace(text)`](#webviewreplacetext)

*   `text` String

Executes editing command `replace` in page.

### [`<webview>.replaceMisspelling(text)`](#webviewreplacemisspellingtext)

*   `text` String

Executes editing command `replaceMisspelling` in page.

### [`<webview>.insertText(text)`](#webviewinserttexttext)

*   `text` String

Inserts `text` to the focused element.

### [`<webview>.findInPage(text[, options])`](#webviewfindinpagetext-options)

*   `text` String - Content to be searched, must not be empty.
*   `options` Object (optional)
    
    *   `forward` Boolean (optional) - Whether to search forward or backward, defaults to `true`.
    *   `findNext` Boolean (optional) - Whether the operation is first request or a follow up, defaults to `false`.
    *   `matchCase` Boolean (optional) - Whether search should be case-sensitive, defaults to `false`.
    *   `wordStart` Boolean (optional) - Whether to look only at the start of words. defaults to `false`.
    *   `medialCapitalAsWordStart` Boolean (optional) - When combined with `wordStart`, accepts a match in the middle of a word if the match begins with an uppercase letter followed by a lowercase or non-letter. Accepts several other intra-word matches, defaults to `false`.

Returns `Integer` - The request id used for the request.

Starts a request to find all matches for the `text` in the web page. The result of the request can be obtained by subscribing to [`found-in-page`](/docs/api/webview-tag#event-found-in-page) event.

### [`<webview>.stopFindInPage(action)`](#webviewstopfindinpageaction)

*   `action` String - Specifies the action to take place when ending [`<webview>.findInPage`](#webviewfindinpagetext-options) request.
    
    *   `clearSelection` - Clear the selection.
    *   `keepSelection` - Translate the selection into a normal selection.
    *   `activateSelection` - Focus and click the selection node.

Stops any `findInPage` request for the `webview` with the provided `action`.

### [`<webview>.print([options])`](#webviewprintoptions)

*   `options` Object (optional)
    
    *   `silent` Boolean (optional) - Don't ask user for print settings. Default is `false`.
    *   `printBackground` Boolean (optional) - Also prints the background color and image of the web page. Default is `false`.
    *   `deviceName` String (optional) - Set the printer device name to use. Default is `''`.

Prints `webview`'s web page. Same as `webContents.print([options])`.

### [`<webview>.printToPDF(options, callback)`](#webviewprinttopdfoptions-callback)

*   `options` Object
    
    *   `marginsType` Integer (optional) - Specifies the type of margins to use. Uses 0 for default margin, 1 for no margin, and 2 for minimum margin.
    *   `pageSize` String | Size (optional) - Specify page size of the generated PDF. Can be `A3`, `A4`, `A5`, `Legal`, `Letter`, `Tabloid` or an Object containing `height` and `width` in microns.
    *   `printBackground` Boolean (optional) - Whether to print CSS backgrounds.
    *   `printSelectionOnly` Boolean (optional) - Whether to print selection only.
    *   `landscape` Boolean (optional) - `true` for landscape, `false` for portrait.
*   `callback` Function
    
    *   `error` Error
    *   `data` Buffer

Prints `webview`'s web page as PDF, Same as `webContents.printToPDF(options, callback)`.

### [`<webview>.capturePage([rect, ]callback)`](#webviewcapturepagerect-callback)

*   `rect` [Rectangle](/docs/api/structures/rectangle) (optional) - The area of the page to be captured.
*   `callback` Function
    
    *   `image` [NativeImage](/docs/api/native-image)

Captures a snapshot of the `webview`'s page. Same as `webContents.capturePage([rect, ]callback)`.

### [`<webview>.send(channel[, arg1][, arg2][, ...])`](#webviewsendchannel-arg1-arg2-)

*   `channel` String
*   `...args` any\[\]

Send an asynchronous message to renderer process via `channel`, you can also send arbitrary arguments. The renderer process can handle the message by listening to the `channel` event with the [`ipcRenderer`](/docs/api/ipc-renderer) module.

See [webContents.send](/docs/api/web-contents#contentssendchannel-arg1-arg2-) for examples.

### [`<webview>.sendInputEvent(event)`](#webviewsendinputeventevent)

*   `event` Object

Sends an input `event` to the page.

See [webContents.sendInputEvent](/docs/api/web-contents#contentssendinputeventevent) for detailed description of `event` object.

### [`<webview>.setZoomFactor(factor)`](#webviewsetzoomfactorfactor)

*   `factor` Number - Zoom factor.

Changes the zoom factor to the specified factor. Zoom factor is zoom percent divided by 100, so 300% = 3.0.

### [`<webview>.setZoomLevel(level)`](#webviewsetzoomlevellevel)

*   `level` Number - Zoom level.

Changes the zoom level to the specified level. The original size is 0 and each increment above or below represents zooming 20% larger or smaller to default limits of 300% and 50% of original size, respectively. The formula for this is `scale := 1.2 ^ level`.

### [`<webview>.getZoomFactor(callback)`](#webviewgetzoomfactorcallback)

*   `callback` Function
    
    *   `zoomFactor` Number

Sends a request to get current zoom factor, the `callback` will be called with `callback(zoomFactor)`.

### [`<webview>.getZoomLevel(callback)`](#webviewgetzoomlevelcallback)

*   `callback` Function
    
    *   `zoomLevel` Number

Sends a request to get current zoom level, the `callback` will be called with `callback(zoomLevel)`.

### [`<webview>.setVisualZoomLevelLimits(minimumLevel, maximumLevel)`](#webviewsetvisualzoomlevellimitsminimumlevel-maximumlevel)

*   `minimumLevel` Number
*   `maximumLevel` Number

Sets the maximum and minimum pinch-to-zoom level.

### [`<webview>.setLayoutZoomLevelLimits(minimumLevel, maximumLevel)`](#webviewsetlayoutzoomlevellimitsminimumlevel-maximumlevel)

*   `minimumLevel` Number
*   `maximumLevel` Number

Sets the maximum and minimum layout-based (i.e. non-visual) zoom level.

### [`<webview>.showDefinitionForSelection()` _macOS_](#webviewshowdefinitionforselection-macos)

Shows pop-up dictionary that searches the selected word on the page.

### [`<webview>.getWebContents()`](#webviewgetwebcontents)

Returns [`WebContents`](/docs/api/web-contents) - The web contents associated with this `webview`.

It depends on the [`remote`](/docs/api/remote) module, it is therefore not available when this module is disabled.

[DOM events](#dom-events)
-------------------------

The following DOM events are available to the `webview` tag:

### [Event: 'load-commit'](#event-load-commit)

Returns:

*   `url` String
*   `isMainFrame` Boolean

Fired when a load has committed. This includes navigation within the current document as well as subframe document-level loads, but does not include asynchronous resource loads.

### [Event: 'did-finish-load'](#event-did-finish-load)

Fired when the navigation is done, i.e. the spinner of the tab will stop spinning, and the `onload` event is dispatched.

### [Event: 'did-fail-load'](#event-did-fail-load)

Returns:

*   `errorCode` Integer
*   `errorDescription` String
*   `validatedURL` String
*   `isMainFrame` Boolean

This event is like `did-finish-load`, but fired when the load failed or was cancelled, e.g. `window.stop()` is invoked.

### [Event: 'did-frame-finish-load'](#event-did-frame-finish-load)

Returns:

*   `isMainFrame` Boolean

Fired when a frame has done navigation.

### [Event: 'did-start-loading'](#event-did-start-loading)

Corresponds to the points in time when the spinner of the tab starts spinning.

### [Event: 'did-stop-loading'](#event-did-stop-loading)

Corresponds to the points in time when the spinner of the tab stops spinning.

### [Event: 'dom-ready'](#event-dom-ready)

Fired when document in the given frame is loaded.

### [Event: 'page-title-updated'](#event-page-title-updated)

Returns:

*   `title` String
*   `explicitSet` Boolean

Fired when page title is set during navigation. `explicitSet` is false when title is synthesized from file url.

### [Event: 'page-favicon-updated'](#event-page-favicon-updated)

Returns:

*   `favicons` String\[\] - Array of URLs.

Fired when page receives favicon urls.

### [Event: 'enter-html-full-screen'](#event-enter-html-full-screen)

Fired when page enters fullscreen triggered by HTML API.

### [Event: 'leave-html-full-screen'](#event-leave-html-full-screen)

Fired when page leaves fullscreen triggered by HTML API.

### [Event: 'console-message'](#event-console-message)

Returns:

*   `level` Integer
*   `message` String
*   `line` Integer
*   `sourceId` String

Fired when the guest window logs a console message.

The following example code forwards all log messages to the embedder's console without regard for log level or other properties.

    const webview = document.querySelector('webview')
    webview.addEventListener('console-message', (e) => {
      console.log('Guest page logged a message:', e.message)
    })

### [Event: 'found-in-page'](#event-found-in-page)

Returns:

*   `result` Object
    
    *   `requestId` Integer
    *   `activeMatchOrdinal` Integer - Position of the active match.
    *   `matches` Integer - Number of Matches.
    *   `selectionArea` Object - Coordinates of first match region.
    *   `finalUpdate` Boolean

Fired when a result is available for [`webview.findInPage`](#webviewfindinpagetext-options) request.

    const webview = document.querySelector('webview')
    webview.addEventListener('found-in-page', (e) => {
      webview.stopFindInPage('keepSelection')
    })
    
    const requestId = webview.findInPage('test')
    console.log(requestId)

### [Event: 'new-window'](#event-new-window)

Returns:

*   `url` String
*   `frameName` String
*   `disposition` String - Can be `default`, `foreground-tab`, `background-tab`, `new-window`, `save-to-disk` and `other`.
*   `options` Object - The options which should be used for creating the new [`BrowserWindow`](/docs/api/browser-window).

Fired when the guest page attempts to open a new browser window.

The following example code opens the new url in system's default browser.

    const { shell } = require('electron')
    const webview = document.querySelector('webview')
    
    webview.addEventListener('new-window', (e) => {
      const protocol = require('url').parse(e.url).protocol
      if (protocol === 'http:' || protocol === 'https:') {
        shell.openExternal(e.url)
      }
    })

### [Event: 'will-navigate'](#event-will-navigate)

Returns:

*   `url` String

Emitted when a user or the page wants to start navigation. It can happen when the `window.location` object is changed or a user clicks a link in the page.

This event will not emit when the navigation is started programmatically with APIs like `<webview>.loadURL` and `<webview>.back`.

It is also not emitted during in-page navigation, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

Calling `event.preventDefault()` does **NOT** have any effect.

### [Event: 'did-navigate'](#event-did-navigate)

Returns:

*   `url` String

Emitted when a navigation is done.

This event is not emitted for in-page navigations, such as clicking anchor links or updating the `window.location.hash`. Use `did-navigate-in-page` event for this purpose.

### [Event: 'did-navigate-in-page'](#event-did-navigate-in-page)

Returns:

*   `isMainFrame` Boolean
*   `url` String

Emitted when an in-page navigation happened.

When in-page navigation happens, the page URL changes but does not cause navigation outside of the page. Examples of this occurring are when anchor links are clicked or when the DOM `hashchange` event is triggered.

### [Event: 'close'](#event-close)

Fired when the guest page attempts to close itself.

The following example code navigates the `webview` to `about:blank` when the guest attempts to close itself.

    const webview = document.querySelector('webview')
    webview.addEventListener('close', () => {
      webview.src = 'about:blank'
    })

### [Event: 'ipc-message'](#event-ipc-message)

Returns:

*   `channel` String
*   `args` Array

Fired when the guest page has sent an asynchronous message to embedder page.

With `sendToHost` method and `ipc-message` event you can communicate between guest page and embedder page:

    // In embedder page.
    const webview = document.querySelector('webview')
    webview.addEventListener('ipc-message', (event) => {
      console.log(event.channel)
      // Prints "pong"
    })
    webview.send('ping')

    // In guest page.
    const { ipcRenderer } = require('electron')
    ipcRenderer.on('ping', () => {
      ipcRenderer.sendToHost('pong')
    })

### [Event: 'crashed'](#event-crashed)

Fired when the renderer process is crashed.

### [Event: 'gpu-crashed'](#event-gpu-crashed)

Fired when the gpu process is crashed.

### [Event: 'plugin-crashed'](#event-plugin-crashed)

Returns:

*   `name` String
*   `version` String

Fired when a plugin process is crashed.

### [Event: 'destroyed'](#event-destroyed)

Fired when the WebContents is destroyed.

### [Event: 'media-started-playing'](#event-media-started-playing)

Emitted when media starts playing.

### [Event: 'media-paused'](#event-media-paused)

Emitted when media is paused or done playing.

### [Event: 'did-change-theme-color'](#event-did-change-theme-color)

Returns:

*   `themeColor` String

Emitted when a page's theme color changes. This is usually due to encountering a meta tag:

    <meta name='theme-color' content='#ff0000'>

### [Event: 'update-target-url'](#event-update-target-url)

Returns:

*   `url` String

Emitted when mouse moves over a link or the keyboard moves the focus to a link.

### [Event: 'devtools-opened'](#event-devtools-opened)

Emitted when DevTools is opened.

### [Event: 'devtools-closed'](#event-devtools-closed)

Emitted when DevTools is closed.

### [Event: 'devtools-focused'](#event-devtools-focused)

Emitted when DevTools is focused / opened.

* * *

[`window.open` Function](#windowopen-function)
==============================================

> Open a new window and load a URL.

When `window.open` is called to create a new window in a web page, a new instance of [`BrowserWindow`](/docs/api/browser-window) will be created for the `url` and a proxy will be returned to `window.open` to let the page have limited control over it.

The proxy has limited standard functionality implemented to be compatible with traditional web pages. For full control of the new window you should create a `BrowserWindow` directly.

The newly created `BrowserWindow` will inherit the parent window's options by default. To override inherited options you can set them in the `features` string.

### [`window.open(url[, frameName][, features])`](#windowopenurl-framename-features)

*   `url` String
*   `frameName` String (optional)
*   `features` String (optional)

Returns [`BrowserWindowProxy`](/docs/api/browser-window-proxy) - Creates a new window and returns an instance of `BrowserWindowProxy` class.

The `features` string follows the format of standard browser, but each feature has to be a field of `BrowserWindow`'s options. These are the features you can set via `features` string: `zoomFactor`, `nodeIntegration`, `preload`, `javascript`, `contextIsolation`, `webviewTag`.

For example:

    window.open('https://github.com', '_blank', 'nodeIntegration=no')

**Notes:**

*   Node integration will always be disabled in the opened `window` if it is disabled on the parent window.
*   Context isolation will always be enabled in the opened `window` if it is enabled on the parent window.
*   JavaScript will always be disabled in the opened `window` if it is disabled on the parent window.
*   Non-standard features (that are not handled by Chromium or Electron) given in `features` will be passed to any registered `webContent`'s `new-window` event handler in the `additionalFeatures` argument.

### [`window.opener.postMessage(message, targetOrigin)`](#windowopenerpostmessagemessage-targetorigin)

*   `message` String
*   `targetOrigin` String

Sends a message to the parent window with the specified origin or `*` for no origin preference.

### [Using Chrome's `window.open()` implementation](#using-chromes-windowopen-implementation)

If you want to use Chrome's built-in `window.open()` implementation, set `nativeWindowOpen` to `true` in the `webPreferences` options object.

Native `window.open()` allows synchronous access to opened windows so it is convenient choice if you need to open a dialog or a preferences window.

This option can also be set on `<webview>` tags as well:

    <webview webpreferences="nativeWindowOpen=yes"></webview>

The creation of the `BrowserWindow` is customizable via `WebContents`'s `new-window` event.

    // main process
    const mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nativeWindowOpen: true
      }
    })
    mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options, additionalFeatures) => {
      if (frameName === 'modal') {
        // open window as modal
        event.preventDefault()
        Object.assign(options, {
          modal: true,
          parent: mainWindow,
          width: 100,
          height: 100
        })
        event.newGuest = new BrowserWindow(options)
      }
    })

    // renderer process (mainWindow)
    let modal = window.open('', 'modal')
    modal.document.write('<h1>Hello</h1>')

* * *

[Windows Store Guide](#windows-store-guide)
===========================================

With Windows 10, the good old win32 executable got a new sibling: The Universal Windows Platform. The new `.appx` format does not only enable a number of new powerful APIs like Cortana or Push Notifications, but through the Windows Store, also simplifies installation and updating.

Microsoft [developed a tool that compiles Electron apps as `.appx` packages](https://github.com/catalystcode/electron-windows-store), enabling developers to use some of the goodies found in the new application model. This guide explains how to use it - and what the capabilities and limitations of an Electron AppX package are.

[Background and Requirements](#background-and-requirements)
-----------------------------------------------------------

Windows 10 "Anniversary Update" is able to run win32 `.exe` binaries by launching them together with a virtualized filesystem and registry. Both are created during compilation by running app and installer inside a Windows Container, allowing Windows to identify exactly which modifications to the operating system are done during installation. Pairing the executable with a virtual filesystem and a virtual registry allows Windows to enable one-click installation and uninstallation.

In addition, the exe is launched inside the appx model - meaning that it can use many of the APIs available to the Universal Windows Platform. To gain even more capabilities, an Electron app can pair up with an invisible UWP background task launched together with the `exe` - sort of launched as a sidekick to run tasks in the background, receive push notifications, or to communicate with other UWP applications.

To compile any existing Electron app, ensure that you have the following requirements:

*   Windows 10 with Anniversary Update (released August 2nd, 2016)
*   The Windows 10 SDK, [downloadable here](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
*   At least Node 4 (to check, run `node -v`)

Then, go and install the `electron-windows-store` CLI:

    npm install -g electron-windows-store

[Step 1: Package Your Electron Application](#step-1-package-your-electron-application)
--------------------------------------------------------------------------------------

Package the application using [electron-packager](https://github.com/electron-userland/electron-packager) (or a similar tool). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

The output should look roughly like this:

    ├── Ghost.exe
    ├── LICENSE
    ├── content_resources_200_percent.pak
    ├── content_shell.pak
    ├── d3dcompiler_47.dll
    ├── ffmpeg.dll
    ├── icudtl.dat
    ├── libEGL.dll
    ├── libGLESv2.dll
    ├── locales
    │   ├── am.pak
    │   ├── ar.pak
    │   ├── [...]
    ├── natives_blob.bin
    ├── node.dll
    ├── resources
    │   ├── app
    │   └── atom.asar
    ├── v8_context_snapshot.bin
    ├── squirrel.exe
    └── ui_resources_200_percent.pak

[Step 2: Running electron-windows-store](#step-2-running-electron-windows-store)
--------------------------------------------------------------------------------

From an elevated PowerShell (run it "as Administrator"), run `electron-windows-store` with the required parameters, passing both the input and output directories, the app's name and version, and confirmation that `node_modules` should be flattened.

    electron-windows-store `
        --input-directory C:\myelectronapp `
        --output-directory C:\output\myelectronapp `
        --flatten true `
        --package-version 1.0.0.0 `
        --package-name myelectronapp

Once executed, the tool goes to work: It accepts your Electron app as an input, flattening the `node_modules`. Then, it archives your application as `app.zip`. Using an installer and a Windows Container, the tool creates an "expanded" AppX package - including the Windows Application Manifest (`AppXManifest.xml`) as well as the virtual file system and the virtual registry inside your output folder.

Once the expanded AppX files are created, the tool uses the Windows App Packager (`MakeAppx.exe`) to create a single-file AppX package from those files on disk. Finally, the tool can be used to create a trusted certificate on your computer to sign the new AppX package. With the signed AppX package, the CLI can also automatically install the package on your machine.

[Step 3: Using the AppX Package](#step-3-using-the-appx-package)
----------------------------------------------------------------

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). In the meantime, all users will be able to install your package by double-clicking it, so a submission to the store might not be necessary if you're looking for an easier installation method. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Another important limitation is that the compiled AppX package still contains a win32 executable - and will therefore not run on Xbox, HoloLens, or Phones.

[Optional: Add UWP Features using a BackgroundTask](#optional-add-uwp-features-using-a-backgroundtask)
------------------------------------------------------------------------------------------------------

You can pair your Electron app up with an invisible UWP background task that gets to make full use of Windows 10 features - like push notifications, Cortana integration, or live tiles.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

[Optional: Convert using Container Virtualization](#optional-convert-using-container-virtualization)
----------------------------------------------------------------------------------------------------

To generate the AppX package, the `electron-windows-store` CLI uses a template that should work for most Electron apps. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Before running the CLI for the first time, you will have to setup the "Windows Desktop App Converter". This will take a few minutes, but don't worry - you only have to do this once. Download and Desktop App Converter from [here](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter). You will receive two files: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1.  Unzip `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2.  Then, run the installation of the Desktop App Converter, passing in the location of the Windows base Image (downloaded as `BaseImage-14316.wim`), by calling `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3.  If running the above command prompts you for a reboot, please restart your machine and run the above command again after a successful restart.

Once installation succeeded, you can move on to compiling your Electron app.

* * *

[Windows Taskbar](#windows-taskbar)
===================================

Electron has APIs to configure the app's icon in the Windows taskbar. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](/docs/tutorial/recent-documents) and [application progress](/docs/tutorial/progress-bar).

[JumpList](#jumplist)
---------------------

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the task bar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from MSDN:

> Applications define tasks based on both the program's features and the key things a user is expected to do with them. Tasks should be context-free, in that the application does not need to be running for them to work. They should also be the statistically most common actions that a normal user would perform in an application, such as compose an email message or open the calendar in a mail program, create a new document in a word processor, launch an application in a certain mode, or launch one of its subcommands. An application should not clutter the menu with advanced features that standard users won't need or one-time actions such as registration. Do not use tasks for promotional items such as upgrades or special offers.
> 
> It is strongly recommended that the task list be static. It should remain the same regardless of the state or status of the application. While it is possible to vary the list dynamically, you should consider that this could confuse the user who does not expect that portion of the destination list to change.

**Tasks of Internet Explorer:**

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts such that when user clicks a task, a program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks](/docs/api/app#appsetusertaskstasks-windows) API:

    const { app } = require('electron')
    app.setUserTasks([
      {
        program: process.execPath,
        arguments: '--new-window',
        iconPath: process.execPath,
        iconIndex: 0,
        title: 'New Window',
        description: 'Create a new window'
      }
    ])

To clean your tasks list, call `app.setUserTasks` with an empty array:

    const { app } = require('electron')
    app.setUserTasks([])

The user tasks will still show even after your application closes, so the icon and program path specified for a task should exist until your application is uninstalled.

[Thumbnail Toolbars](#thumbnail-toolbars)
-----------------------------------------

On Windows you can add a thumbnail toolbar with specified buttons in a taskbar layout of an application window. It provides users a way to access to a particular window's command without restoring or activating the window.

From MSDN, it's illustrated:

> This toolbar is the familiar standard toolbar common control. It has a maximum of seven buttons. Each button's ID, image, tooltip, and state are defined in a structure, which is then passed to the taskbar. The application can show, enable, disable, or hide buttons from the thumbnail toolbar as required by its current state.
> 
> For example, Windows Media Player might offer standard media transport controls such as play, pause, mute, and stop.

**Thumbnail toolbar of Windows Media Player:**

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons](/docs/api/browser-window#winsetthumbarbuttonsbuttons-windows) to set thumbnail toolbar in your application:

    const { BrowserWindow } = require('electron')
    const path = require('path')
    
    const win = new BrowserWindow()
    
    win.setThumbarButtons([
      {
        tooltip: 'button1',
        icon: path.join(__dirname, 'button1.png'),
        click () { console.log('button1 clicked') }
      }, {
        tooltip: 'button2',
        icon: path.join(__dirname, 'button2.png'),
        flags: ['enabled', 'dismissonclick'],
        click () { console.log('button2 clicked.') }
      }
    ])

To clean thumbnail toolbar buttons, just call `BrowserWindow.setThumbarButtons` with an empty array:

    const { BrowserWindow } = require('electron')
    
    const win = new BrowserWindow()
    win.setThumbarButtons([])

[Icon Overlays in Taskbar](#icon-overlays-in-taskbar)
-----------------------------------------------------

On Windows a taskbar button can use a small overlay to display application status, as quoted from MSDN:

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

**Overlay on taskbar button:**

![Overlay on taskbar button](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon](/docs/api/browser-window#winsetoverlayiconoverlay-description-windows) API:

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow()
    win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')

[Flash Frame](#flash-frame)
---------------------------

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame](/docs/api/browser-window#winflashframeflag) API:

    const { BrowserWindow } = require('electron')
    let win = new BrowserWindow()
    win.once('focus', () => win.flashFrame(false))
    win.flashFrame(true)

Don't forget to call the `flashFrame` method with `false` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

* * *

* * *

Improve this doc Translate this doc [Version history](/history)