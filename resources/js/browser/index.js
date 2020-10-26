/* global angular */
console.log('=== browser/index.js 111');
require('./desktopShare/chromeApi');

(function () {
	const path = require('path');
	const { ipcRenderer, remote } = require('electron');
	// const pageTitleNotifications = require('./notifications/pageTitleNotifications');
	const ActivityManager = require('./notifications/activityManager');
	const config = remote.getGlobal('config');

	window.electronSafeIpc = ipcRenderer;




	// if (config.onlineOfflineReload) {
	// 	require('./onlineOfflineListener')();
	// }
	// if (config.rightClickWithSpellcheck) {
	// 	require('./rightClickMenuWithSpellcheck');
	// }
	// require('./zoom')();


	const iconPath = path.join(__dirname, '../assets/icons/icon-96x96.png');

	new ActivityManager(ipcRenderer, iconPath).start();

	// if (config.enableDesktopNotificationsHack) {
	// 	pageTitleNotifications(ipcRenderer);
	// }

	document.addEventListener('DOMContentLoaded',() => {
		modifyAngularSettingsWithTimeot();
	});

	function disablePromoteStuff(injector) {
		injector.get('settingsService').appConfig.promoteMobile = false;
		injector.get('settingsService').appConfig.promoteDesktop = false;
		injector.get('settingsService').appConfig.hideGetAppButton = true;
		injector.get('settingsService').appConfig.enableMobileDownloadMailDialog = false;
	}

	function enableChromeVideoAudioMeetings(injector) {
		console.log('=== browser/index.js 222');

		injector.get('callingSupportService').oneOnOneCallingEnabled = true;
		injector.get('callingSupportService').isDesktopApp	 = true;
		injector.get('callingSupportService').isChromeMeetingSingleVideoEnabled = true;
		injector.get('callingSupportService').isChromeVideoOneOnOneEnabled = true;
		injector.get('callingSupportService').isChromeVideoMultipartyEnabled = true;
		injector.get('settingsService').appConfig.angularDebugInfoEnabled = true;
		injector.get('settingsService').appConfig.enableCallingChromeOneOnOne = true;
		injector.get('settingsService').appConfig.callingEnableChromeMeetingSingleVideo = true;
		injector.get('settingsService').appConfig.callingEnableChromeMultipartyVideo = true;
		injector.get('settingsService').appConfig.callingEnabledLinux = true;
		injector.get('settingsService').appConfig.enableChromeScreenSharing = true;
		injector.get('settingsService').appConfig.enableAddToChatButtonForMeetings = true;
		injector.get('settingsService').appConfig.enableSharingOnlyCallChrome = true;
		injector.get('settingsService').appConfig.enableScreenSharingToolbar = true;
		injector.get('settingsService').appConfig.enableCallingScreenPreviewLabel = true;
		injector.get('settingsService').appConfig.callingEnableChromeOneToOneVideo = true;
		injector.get('settingsService').appConfig.enableMeetingStartedNotificationWeb = true;
		injector.get('settingsService').appConfig.enableMicOSUnmuteOnUnmute = true;
		injector.get('settingsService').appConfig.enableModeratorsSupport = true;
		injector.get('settingsService').appConfig.enableRecordPPTSharing = true;
		injector.get('settingsService').appConfig.enable3x3VideoLayout = true;
		injector.get('settingsService').appConfig.enableCallTranscript = true;
		injector.get('settingsService').appConfig.enableCallTransferredScreen = true;
		injector.get('settingsService').appConfig.enableCameraSharing = true;
		injector.get('settingsService').appConfig.enableEdgeScreenSharing = true;
		injector.get('settingsService').appConfig.enableSeeMyScreenshare = true;
		injector.get('settingsService').appConfig.enableSmartReplies = true;
		injector.get('settingsService').appConfig.enableSms = true;
		injector.get('settingsService').appConfig.enableTestCallForAll = true;
		injector.get('settingsService').appConfig.enableUnreadMessagesButton = true;
		injector.get('settingsService').appConfig.enableVideoBackground = true;
		injector.get('settingsService').appConfig.disableCallingOnlineCheck = false;

		// experimental!
		// injector.get('settingsService').appConfig.callingSkypeWatermarkEnabled = true;
		// injector.get('settingsService').appConfig.enableBackgroundBlurringAPIV2 = true;

		// fix! avoid using display media, use chrome screen media (or chromeApi.js selection) isntead!
		injector.get('settingsService').appConfig.enableChromeGetDisplayMedia = false;
		setTimeout(function () {
			injector.get('settingsService').updateSetting('enableChromeGetDisplayMedia', false);
		}, 4500);
		var callingAgentsService = injector.get('callingAgentsService');
		window.callingAgentsService = callingAgentsService;
		callingAgentsService.getMediaAgentSettings = function() {
			var e = this.appConfig.callingConstants
				, t = {
				debug: e.media.debug,
				numVideoChannelsGvc: e.media.maximumNumberOfVideoStreams,
				requestTimeoutMs: this.constants.promise.defaultTimeout
			};
			return this.isWebRtcOneOnOneCallingEnabled() && (t.webrtcAllowedMediaContentType = ["application/sdp-ngc-1.0", "application/sdp-ngc-0.5"],
				t.webrtcMediaContentType = "application/sdp-ngc-1.0"),
			this.isWebRtcScreenSharingEnabled() && (t.webrtcOutgoingScreenSharingEnabled = !0,
				console.log('WWWWWWWWWWWWWWWWWWW', this.settingsService.valueAsBoolean(this.constants.settings.names.enableChromeGetDisplayMedia)),
				t.webrtcGetDisplayMediaEnabled = this.settingsService.valueAsBoolean(this.constants.settings.names.enableChromeGetDisplayMedia) || this.platformDetectService.getBrowser() === this.constants.browser.safari || this.platformDetectService.getBrowser() === this.constants.browser.firefox),
				console.log('XXXXXXXXXXXXXXXXXXX', t.webrtcGetDisplayMediaEnabled),
			  t.webrtcGetDisplayMediaEnabled = false,
			  console.log('YYYYYYYYYYYYYYYYYYY', t.webrtcGetDisplayMediaEnabled),
				t.chromeExtensionId = this.settingsService.valueFor(this.constants.settings.names.chromeScreenSharingExtensionId),
			this.isEdgeScreenSharingEnabled() && (t.ortcOutgoingScreensharingEnabled = !0),
				t
		};



		window.injector = injector;
		window.settingsService = injector.get('settingsService');
		setTimeout(function () {
			console.log("callingSupportService ...");
			var callingSupportService = injector.get('callingSupportService');
			console.log("callingSupportService", callingSupportService);
			window.callingSupportService = callingSupportService;


			console.log('=== appConfig.enableChromeGetDisplayMedia', injector.get('settingsService').appConfig.enableChromeGetDisplayMedia);
			console.log('=== valueAsBoolean(enableChromeGetDisplayMedia)', settingsService.valueAsBoolean(settingsService.constants.settings.names.enableChromeGetDisplayMedia));


		}, 5000);

		console.log('=== browser/index.js 222 done');
	}

	function modifyAngularSettingsWithTimeot() {
		setTimeout(() => {
			try {
				let injector = angular.element(document).injector();

				if(injector) {
					enableChromeVideoAudioMeetings(injector);
					disablePromoteStuff(injector);

					injector.get('settingsService').settingsService.refreshSettings();
				}
			} catch (error) {
				if (error instanceof ReferenceError) {
					modifyAngularSettingsWithTimeot();
				}
			}
		}, 4000);
	}

	Object.defineProperty(navigator.serviceWorker, 'register', {
		value: () => {
			return Promise.reject()
		}
	});
}());

