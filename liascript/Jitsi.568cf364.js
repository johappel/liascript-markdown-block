var e=("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{}).parcelRequire55a5;e.register("eSzt7",(function(n,o){var t,i,s,c;t=n.exports,i="Sync",s=function(){return a},Object.defineProperty(t,i,{get:s,set:c,enumerable:!0,configurable:!0});var r=e("2Xs1f"),d=e("5Owdb");class a extends d.Sync{destroy(){var e;null===(e=this.connection)||void 0===e||e.disconnect(),super.destroy()}async connect(e){super.connect(e),this.domain=e.config||"meet.jit.si",window.JitsiMeetJS?this.init(!0):this.load(["https://meet.jit.si/libs/lib-jitsi-meet.min.js"],this)}init(e,n){const o=this.uniqueID();if(e&&window.JitsiMeetJS&&o){window.LIA.debug||window.JitsiMeetJS.setLogLevel(window.JitsiMeetJS.logLevels.ERROR),this.connection=new window.JitsiMeetJS.JitsiConnection(null,null,{hosts:{domain:this.domain,muc:`conference.${this.domain}`,focus:`focus.${this.domain}`},configOverwrite:{openBridgeChannel:!1},serviceUrl:`https://${this.domain}/http-bind?room=${btoa(o)}`,clientNode:"http://jitsi.org/jitsimeet"});const e=this;this.connection.addEventListener(window.JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,(function(){e.conferenceRoom=e.connection.initJitsiConference(btoa(o).toLowerCase(),{configOverwrite:{openBridgeChannel:!1},enableLayerSuspension:!0,p2p:{enabled:!0}}),e.conferenceRoom.setDisplayName(e.token),e.conferenceRoom.on(window.JitsiMeetJS.events.conference.CONFERENCE_JOINED,(()=>{e.sendConnect()})),e.conferenceRoom.on(window.JitsiMeetJS.errors.conference.PASSWORD_REQUIRED,(()=>{e.sendDisconnectError("password required")})),e.conferenceRoom.on(window.JitsiMeetJS.events.conference.USER_JOINED,(n=>{e.users[n]||(e.users[n]=null)})),e.conferenceRoom.on(window.JitsiMeetJS.events.conference.USER_LEFT,(n=>{const o=e.users[n];o&&e.db.removePeer(o),delete e.users[n]})),e.conferenceRoom.on(window.JitsiMeetJS.events.conference.MESSAGE_RECEIVED,((n,o)=>{const t=e.conferenceRoom.getParticipants();for(let o=0;o<t.length;o++)if(n===t[o].getId()){e.users[n]=t[o].getDisplayName();break}const i=d.base64_to_unit8(o.slice(1));"1"===o[0]?e.applyUpdate(o):"0"===o[0]&&e.pubsubReceive(i)})),e.conferenceRoom.join()})),this.connection.addEventListener(window.JitsiMeetJS.events.connection.CONNECTION_FAILED,(n=>{e.sendDisconnectError("Connection failed"+n)})),this.connection.addEventListener(window.JitsiMeetJS.events.connection.CONNECTION_DISCONNECTED,(n=>{e.disconnect()})),this.connection.connect()}else{let e="Jitsi unknown error";n?e="Could not load resource: "+n:void 0===window.JitsiMeetJS&&(e="Could not load Jitsi interface"),this.sendDisconnectError(e)}}broadcast(e,n){try{var o;null===(o=this.conferenceRoom)||void 0===o||o.sendTextMessage((e?"1":"0")+d.uint8_to_base64(n))}catch(e){console.warn("Jitsi: broadcast =>",e.message)}}constructor(...e){super(...e),(0,r.default)(this,"users",{})}}}));