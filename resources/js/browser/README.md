# Browser

The files in here handle the code that talks with the browser  page.

The [index.js](index.js) is the entry point.

The [onlineOfflineListener.js](onlineOfflineListener.js) adds listeners to the online/offline events and emit an 'online-status-changed' to the ipc when it receives a online/offline event.

The [zoom.js](zoom.js) inject the keyboard shortcuts for zoom in the browser.

The [rightClickMenuWithSpellcheck.js](rightClickMenuWithSpellcheck.js) handles the spellchecker and right menu click funcionality. We are leveraging the spellchecker capabilitites to [electron-spell-check-provider](https://www.npmjs.com/package/electron-spell-check-provider) and the right click menu to the  [electron-editor-context-menu](https://github.com/mixmaxhq/electron-editor-context-menu) modules.

The notifications folder contains:

*  [pageTitleNotifications.js](notifications/pageTitleNotifications.js) file handles the emitting of an event when the page-title changes and indicates that there is an unread message.
*  [activityManager.js](notifications/activityManager.js) listens for changes in the chatListService and bellNotificationsService to update the unread count.
*  [trayIconRenderer.js](notifications/trayIconRenderer.js) renders a new icon with the number of unread messages.

The desktopShare folder contains the logic to add basic destop sharing capabilities to the app.

It also generates a new icon with the notifications count. This can be use later by the tray or app to modify the app icon.


## Teams Screen Sharing - Useful commands

injector = angular.element(document).injector();

callingSupportService = injector.get('callingSupportService')
callingSupportService.isScreenSharingFromChromeWithExtension()

callingSupportService.isScreenSharingFromChromeWithExtension = function() { return true; };


 
screenSharingControlService = injector.get('screenSharingControlService')





electronSafeIpcService = injector.get('electronSafeIpcService')
electronSafeIpcService.send('test')

 



## Teams Screen Sharing - Debugging and Reverse Engineering - Intersting files

### https://statics.teams.cdn.office.net/src/app/components/calling-screensharing-panel/calling-screensharing-panel.min.js

107:	this.ipc = h.electronSafeIpc,									                                                Interessant!

376:	s.prototype.isDesktopSharingAvailable = function() {

379:	s.prototype.isAppSharingAvailable = function() {

505:	s.prototype.isChromeExtensionInstalledAsync = function() {

513:	s.prototype.startChromeExtensionInstallation = function() {

519:	s.prototype.startChromeExtensionPolling = function(e, t) {

561:	s.prototype.startSharing = function(t, i) {
			var n = this;
			this.$window.vdi && this.$window.vdi.setScreenSharePanelId && this.$window.vdi.setScreenSharePanelId(t.getId()),
			this.completeLoadScenario();
			var s = this.getAnalyticsEventData(t, i);
			if (this.analyticsService.onPanelAction(this.$scope, s),
			e.services.CallUtilities.logExternalForDDL(this.logger, "Starting VBSS"),
			this.dismissSharingAlerts(),
			this.isScreenSharingFromChromeWithExtension && !this.isChromeExtensionInstalled)
				return this.startChromeExtensionPolling(t, i),
				this.showChromeExtensionRequiredAlert(),
				this.startChromeExtensionInstallation(),
				void this.logger.error("Need to install Chrome screen sharing extension");
			this.actionsHandler.startSharing(t, this.shouldShareSystemAudio),                                           actionHandler.startSharing() - this is the real action?
			this.call && !this.call.isScreenshareFromChat && this.ipc.send("callScreen:minimize"),                      ipc.send call to electron??
			this.isNewChatSceenshare && _.defer(function() {
				return n.newChatService.clearNewChat(!1)
			})
		}
		

#### https://statics.teams.cdn.office.net/src/app/services/calling/callingUserActionService.min.js

1018:   l.prototype.startAskPermissionFromIntent = function(e, n, i, o) {

1035:   l.prototype.startAskPermission = function(e, n, i, o) {

1053:   l.prototype.storeGetUserMediaOptions = function(e) {


### https://statics.teams.cdn.office.net/src/app/services/calling/getUserMediaService.min.js

449:    angular.module("teamspace.getUserMediaService"


### https://statics.teams.cdn.office.net/src/app/services/calling/callingSupportService.min.js

274:    l.prototype.updateSettings = function() {
            var e = this.constants.settings.names.enableCallingBrowserOneOnOne[this.browser];
            this.oneOnOneCallingEnabled = !!e && this.settingsService.valueAsBoolean(e);
            var i = this.constants.settings.names.callingEnableBrowserOneToOneVideo[this.browser];
            this.isWebRtcVideoOneOnOneEnabled = !!i && this.settingsService.valueAsBoolean(i);
            var t = this.constants.settings.names.callingEnableBrowserMultipartyVideo[this.browser];
            this.isWebRtcVideoMultipartyEnabled = !!t && this.settingsService.valueAsBoolean(t);
            var n = this.constants.settings.names.callingEnableBrowserMeetingSingleVideo[this.browser];
            this.isWebRtcMeetingSingleVideoEnabled = !!n && this.settingsService.valueAsBoolean(n),
            this.enableRequestedConstraintsForGetUserMedia = this.settingsService.valueAsBoolean(this.constants.settings.names.enableRequestedConstraintsForGetUserMedia),
            this.enableSfBDeeplinking = this.settingsService.valueAsBoolean(this.constants.settings.names.enableSfBDeeplinking),
            this.enablePreJoinContentOnly = this.settingsService.valueAsBoolean(this.constants.settings.names.enablePreJoinContentOnly),
            this.enablePreJoinContentOnlyWeb = this.settingsService.valueAsBoolean(this.constants.settings.names.enablePreJoinContentOnlyWeb),
            this.enableMeetingPreJoinExperience = this.settingsService.valueAsBoolean(this.constants.settings.names.enableMeetingPreJoinExperience),
            this.enablePowerPointSharing = this.settingsService.valueAsBoolean(this.constants.settings.names.enablePowerPointSharing),
            this.enableBackgroundBlurringAPIV2 = this.settingsService.valueAsBoolean(this.constants.settings.names.enableBackgroundBlurringAPIV2),
            this.enableVoipCallTab = this.settingsService.valueAsBoolean(this.constants.settings.names.enableVoipCallTab),
            this.enableQuickJoinWithoutModality = this.settingsService.valueAsBoolean(this.constants.settings.names.enableQuickJoinWithoutModality),
            this.enableQuickJoinWithoutModalityAnon = this.settingsService.valueAsBoolean(this.constants.settings.names.enableQuickJoinWithoutModalityAnon),
            this.enableQuickJoinWithoutModalityWeb = this.settingsService.valueAsBoolean(this.constants.settings.names.enableQuickJoinWithoutModalityWeb),
            this.enableCallPreHeatDesktop = this.settingsService.valueAsBoolean(this.constants.settings.names.enableCallPreHeatDesktop),
            this.enableCallPreHeatWeb = this.settingsService.valueAsBoolean(this.constants.settings.names.enableCallPreHeatWeb),
            this.largeMeetingSettings = this.settingsService.valueFor(this.constants.settings.names.callingConstants).largeMeeting,
            this.maxItemsOnStage = this.getMaxNrOfStageItems(),
            this.enableTransferAndCompanion = this.settingsService.valueAsBoolean(this.constants.settings.names.enableTransferAndCompanion),
            this.useAPCToBlockAVOverIPInMeetings = this.settingsService.valueAsBoolean(this.constants.settings.names.useAPCToBlockAVOverIPInMeetings),
            this.enableIPAudioVideoModes = this.settingsService.valueAsBoolean(this.constants.settings.names.enableIPAudioVideoModes),
            this.retrieveSSFCMeetingPolicyFlagValue()
        }

424:    l.prototype.isScreenSharingSupported = function() {
            if (this.desktopUtilityService.avIsRemoted() && window.vdi)
                return this.settingsService.valueAsBoolean(this.constants.settings.names.enableBrowserScreenSharing.chrome) && window.vdi.isFeatureSupported(e.services.VDIFeatureId.Screenshare) && window.vdi.isFeatureSupported(e.services.VDIFeatureId.Video);
            var i = this.constants.settings.names.enableBrowserScreenSharing[this.browser];
            return this.isDesktopApp || this.isSurfaceHub1 || !!i && this.settingsService.valueAsBoolean(i)
        }
        
431:    l.prototype.isScreenSharingFromChromeWithExtension = function() {
            var e = this.isWeb && (this.browser === this.constants.browser.chrome || this.browser === this.constants.browser.edgeChromium) && this.settingsService.valueAsBoolean(this.constants.settings.names.enableBrowserScreenSharing.chrome);
            return e && this.settingsService.valueAsBoolean(this.constants.settings.names.enableChromeGetDisplayMedia) ? !(navigator && navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) : e
        }

440:    l.prototype.isBackgroundBlurringAPIV2Enabled = function() {
            return this.desktopUtilityService.isElectron() && !this.desktopUtilityService.avIsRemoted() && this.enableBackgroundBlurringAPIV2
        }


### https://statics.teams.cdn.office.net/src/app/services/calling/callingService.min.js

### https://statics.teams.cdn.office.net/src/app/services/calling/mixins/callingScreensharingMixin/callingScreensharingMixin.min.js

142:    i.prototype.startScreenSharingOnCall = function(i, n, r, a) {
            var o = this;
            if (4 === this.call.state || 5 === this.call.state)
                return this.logger.error("Cannot start screenSharing: call is on hold"),
                this.$q.reject("Failed to start screenSharing in call " + this.call.callId);
            this.context = n || "unknown";
            var s = this.call.getTagForMediaStartOperation(3)
              , c = this.startScreenSharerScenario(i, s);
            this.logger.info("startScreenSharing in call " + this.call.callId + ", call state " + this.call.state + ", source " + (i ? i.getType() : "undefined") + ", tag " + s),
            i && this.screenSharingControlService.setSharingSource(this.call, i),
            this.lastSharingSourceType = i && i.getType() || 1,
            this.selectedCamera = 3 === this.lastSharingSourceType ? i.getDeviceId() : null;
            var l = function() {
                return r && o.call.changeCropRegion ? o.call.startScreenSharing(i, r, s) : o.call.startScreenSharing(i, void 0, s)
            }
              , g = (this.call.isVideoOn && (this.desktopUtilityService.isPluginless() && this.callingSupportService.isSingleIncomingVideoSupported(this.call) || i && 3 === i.getType()) && !this.platformDetectService.isRigel() ? Promise.resolve().then(function() {
                return o.callTogglingService.toggleVideo(o.call, o.constants.scenarios.calling.context.screenshareStart)
            }).then(function() {
                return o.call.raiseTeamsCallEvent("videoDisabledWhileScreensharing")
            }).catch(function() {
                o.logger.warn("Failed to stop outgoing video")
            }).then(function() {
                return l()
            }) : l()).then(function() {
                2 == o.lastSharingSourceType && (o.windowState = t.WindowRestored,
                o.scraperEventSubscription = o.call.on("scraperEvent", function(e) {
                    return o.scraperEvent(e)
                })),
                o.sharingStolenSubscription = o.call.on("sharingStolen", function() {
                    return o.stopScreenSharingOnCall(o.constants.scenarios.calling.context.screensharingStolen)
                }),
                o.sharingDroppedSubscription = o.call.on("sharingDropped", function() {
                    return o.stopScreenSharingOnCall(o.constants.scenarios.calling.context.screenSharingDropped)
                }),
                o.deviceManagerChangedSubscription = o.deviceManagerService.subscribe(o.onDevicesChanged.bind(o), o.constants.events.calling.devicesChanged),
                c.eventData[o.constants.counters.eventNames.endpointId] = o.call.endpointId,
                c.stop(),
                a && o.call.startSystemAudioSharing(),
                o.sharingSessionParticipantStates = new e.ScreensharingSessionParticipantStates(o.call,o.constants,o.loggingService,o.callingTelemetryService,o.screenSharingControlService)
            }).catch(function(e) {
                o.lastSharingSourceType = null;
                var t;
                try {
                    t = JSON.stringify(e)
                } catch (i) {
                    t = e
                }
                o.logger.error("Failed to start screenSharing in call " + o.call.callId + ", error: " + t),
                e && o.isExpectedErrorCausedByUserAction(e) ? c.incomplete() : (2 === e.errorType && o.callingAgentsService.callSupport.onVideoRenderingFailure(),
                c.eventData[o.constants.counters.eventNames.error] = t,
                c.fail())
            });
            return this.desktopUtilityService.isHwa() ? this.ariaLiveService.update(this.$translate.instant(this.resources.strings.aria_live_start_screensharing_short)) : this.ariaLiveService.update(this.$translate.instant(this.resources.strings.aria_live_start_screensharing)),
            g
        }

### https://statics.teams.cdn.office.net/src/app/services/calling/vdiSupport.min.js

83:     r.prototype.mediaStackIsLocal = function() {
            return this.connectedState === n.Local
        }
        
407:    r.prototype.getGUMConstraintsFromGDM = function(e) {
            var t = {
                audio: !1,
                video: {
                    mandatory: {
                        chromeMediaSource: "screen"
                    }
                }
            };
            if (e && e.video) {
                var i = e.video;
                i.height && i.height.max && (t.video.mandatory.maxHeight = i.height.max),
                i.width && i.width.max && (t.video.mandatory.maxWidth = i.width.max)
            }
            return t
        }
        
424:    r.prototype.getDisplayMedia = function() {
            var e = this;
            if (this.mediaStackIsLocal()) {
                var t = this.getGUMConstraintsFromGDM(arguments[0]);
                return new Promise(function(i, n) {
                    return e.origWebkitGetUserMedia.apply(navigator, [t, i, n])
                }
                )
            }
            return this.shimFns.getDisplayMedia.apply(this, arguments)
        }

### https://statics.teams.cdn.office.net/src/app/services/calling/vdi/vdiUiSupport.min.js

### https://statics.teams.cdn.office.net/hashedjs/skype-calling-pluginless.bundle-5ca00d74.js

Call Stack from working call in teams-for-linux
sendMessage()
queryDisplayStreamId()
getSourceId())
getStream()
request()
add()
getStream()
getOrCreateMediaStream()
stertSterm()
start()
getMediaStream()
createDevicesHandle()
getScreenHandle()
startScreenSharing()
checkPendingOperationAndExecute()
executeInternal()
execute()
value()
callScreensharingMixin.startSharingOnCall

42774:      t.prototype.getSuitableStream = function(e) {
               var t, n = this;
               return this.cachedStreamsMap.forEach(function(i, r) {
                   n.isSuitable(r, e) && (t = r)
               }),
               t && this.cachedStreamsMap.get(t)
           }

42782:     t.prototype.createCachedStream = function(e, t) {
                var n = this.createStream(e, t);
                return this.subscribeOnStreamEvents(n),
                this.logger.safe.info("created media stream, id: " + n.id + " total: " + this.cachedStreamsMap.size),
                this.cachedStreamsMap.set(e, n),
                n
            }
            
HERE IT IS GETTING IMPORTANT - SET USEFUL streamConstraints IN DEBUGGER AND IT WILL WORK
            {
                audio: false,
                video: {
                    // deviceId: ""display,
                    mandatory: { chromeMediaSource: "screen" }
                }
            }
42791:      t.prototype.createStream = function(e, t) {
                var n = new s.default(this.logger,this.configProvider.config);
                return t || (n.config.gumRequestTimeout = 0),
                this.configProvider.config.webrtcSimulcastSessionEnabled && c.UserAgentConfig.hasApplyConstraints() && "Edge" !== r.getBrowserInfo().name ? new d.SimulcastMediaStream(e,this.mediaStreamSerialQueue,n,this.logger) : new l.MediaStreamInternal(e,this.mediaStreamSerialQueue,this.logger,n)
            }                    


41964:      i.permissionManager = new h.PermissionManager(n,{
                getMediaStream: function(e) {
                    return i.getMediaStream(e, !1)
                },
                hasCamera: function() {
                    return i.hasCamera()
                },
                raiseTelemetryEvent: function(e, t) {
                    return i.raiseTelemetryEvent(e, t)
                },
                getActiveConstraints: function() {
                    return i.mediaStreamManager.getActiveConstraints()
                },
                handlePermissionStateChange: function() {
                    return i.handlePermissionStateChange()
                }
            }

30608:      if (t.config.webrtcGetDisplayMediaEnabled && a.WebRTCDisplayStreamProvider.isSupported())
                return new a.WebRTCDisplayStreamProvider(n);
            if (a.WebRTCExtensionDisplayStreamProvider.isSupported())
                return new a.WebRTCExtensionDisplayStreamProvider(t,n)
                
            # We want it to use WebRTCExtensionDisplayStreamProvider - but it is using WebRTCDisplayStreamProvider :-(
            # Can be fixed by setting t/configProvider.config.webrtcGetDisplayMediaEnabled = false

### https://statics.teams.cdn.office.net/src/app/services/calling/callingAgentsService.min.js

576:       i.prototype.getMediaAgentSettings = function() {
                var e = this.appConfig.callingConstants
                  , t = {
                    debug: e.media.debug,
                    numVideoChannelsGvc: e.media.maximumNumberOfVideoStreams,
                    requestTimeoutMs: this.constants.promise.defaultTimeout
                };
                return this.isWebRtcOneOnOneCallingEnabled() && (t.webrtcAllowedMediaContentType = ["application/sdp-ngc-1.0", "application/sdp-ngc-0.5"],
                t.webrtcMediaContentType = "application/sdp-ngc-1.0"),
                this.isWebRtcScreenSharingEnabled() && (t.webrtcOutgoingScreenSharingEnabled = !0,
                t.webrtcGetDisplayMediaEnabled = this.settingsService.valueAsBoolean(this.constants.settings.names.enableChromeGetDisplayMedia) || this.platformDetectService.getBrowser() === this.constants.browser.safari || this.platformDetectService.getBrowser() === this.constants.browser.firefox),
                t.chromeExtensionId = this.settingsService.valueFor(this.constants.settings.names.chromeScreenSharingExtensionId),
                this.isEdgeScreenSharingEnabled() && (t.ortcOutgoingScreensharingEnabled = !0),
                t
            }
