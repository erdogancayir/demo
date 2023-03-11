<template>
    <div class="about w3-animate-zoom">
      {{ PageChangeEvent() }}
      <br>
      <h1>Game Page</h1>
      <br>
      <br>
      <div v-if="joinedGame" class="w3-display-container" style="margin: auto;width: 800px;">
  
        <img :src="firstUserInfo == null ? '' : image_url + firstUserInfo?.profilePicture" class="w3-bar-item w3-circle"
          style="width: 85px;height:85px;float: left;margin-bottom: 10px;object-fit: cover;">
  
        <img :src="lastUserInfo == null ? '' : image_url + lastUserInfo?.profilePicture" class="w3-bar-item w3-circle"
          style="width: 85px;height:85px;float: right;margin-bottom: 10px;object-fit: cover;">
  
        <br>
        <canvas ref='canvas' width="800" height="500" style="border:1px solid #d3d3d3;"></canvas>
        <br>
        <br>
  
        <div class="w3-bar">
          <button class="w3-btn w3-btn-block w3-red w3-bar-item" style="float: left;" v-on:click="LeaveGame()">Leave
            Game</button>
  
          <button class="w3-btn w3-btn-block w3-green w3-bar-item" v-on:click="CopyViewerLink()"
            style="margin-left: 20px;">Copy Viewer Link</button>
  
          <button v-if="!gameStarted && roomPassword != ''" class="w3-btn w3-btn-block w3-green w3-bar-item"
            v-on:click="CopyPlayerLink()" style="margin-left: 20px;">Copy Player Link</button>
        </div>
  
        <br>
        <br>
  
        <div v-if="viewersUserInfo.length != 0" class="w3-bar">
          <b style="float: left;margin-right: 10px;">Viewers: </b>
          <img v-for="(viewerUserInfo) in viewersUserInfo" :key="viewerUserInfo?.id"
            :src="viewerUserInfo == null ? '' : image_url + viewerUserInfo?.profilePicture" class="w3-bar-item w3-circle"
            style="width: 85px;height:85px;float: left;margin-right: 10px;object-fit: cover;">
        </div>
  
      </div>
      <br>
      <div v-if="!joinedGame">
        <button class="w3-btn w3-btn-block w3-green" v-on:click="StartGame(0/*JoinType.Random*/)">Join Random Room</button>
        <br>
        <br>
        <button class="w3-btn w3-btn-block w3-green" v-on:click="StartGame(1/*JoinType.Create*/)">Create Room</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted, onServerPrefetch, onUpdated, defineComponent } from 'vue';
  import { useCookies } from "vue3-cookies";
  import { io, connect, Socket } from "socket.io-client";
  const { cookies } = useCookies();
  
  function clamp(number: number, min: number, max: number) {
    return Math.max(min, Math.min(number, max));
  }
  
  enum Me {
    firstUser,
    lastUser,
    viewer
  }
  
  export enum JoinType {
    Random,
    Craete,
    Player,
    Viewer,
  }
  
  export default defineComponent({
    data() {
      return {
        global: this.$global as any,
        gameStarted: false,
        joinedGame: false,
        roomId: "",
        roomPassword: "",
        me: Me.viewer,
        pos: 210,
  
        firstUserInfo: null as any,
        lastUserInfo: null as any,
        viewersUserInfo: [] as any[],
  
        tmpUsers: new Map() as Map<number, any>,
        image_url: process.env.VUE_APP_BACKEND_URL + "/files/file/",
      }
    },
    beforeRouteLeave() {
      //this.socket?.disconnect();
    },
    async beforeMount() {
      //get url info
      const roomId: string | null = this.$route.query.roomId as string;
      const roomPassword: string | null = this.$route.query.roomPassword as string;
      if (roomId != null) {
        this.roomId = roomId;
        if (roomPassword != null) {
          this.roomPassword = roomPassword;
          this.StartGame(JoinType.Player);
        }
        else {
          this.StartGame(JoinType.Viewer);
        }
      }
  
      //key events
      document.addEventListener('keypress', (event) => {
        if (!this.gameStarted)
          return;
        var value = 0;
        if (event.code == "KeyW")
          value -= 30;
        if (event.code == "KeyS")
          value += 30;
        if (value == 0)
          return;
        this.pos = clamp(this.pos + value, 5, 395);
  
        if (this.me == Me.firstUser)
          this.global.socket.emit("setFirstUserPos", { roomId: this.roomId, firstUserPos: this.pos });
        if (this.me == Me.lastUser)
          this.global.socket.emit("setLastUserPos", { roomId: this.roomId, lastUserPos: this.pos });
  
      }, false);
    },
    methods: {
      PageChangeEvent() {
        if (cookies.get("token") == null) {
          alert("Connection timed out!");
          this.$router.push({ path: '/' }).then(() => {
            this.$router.go(0);
          });
        }
      },
      StartGame(joinType: JoinType) {
        this.joinedGame = true;
        setTimeout(this.DrawInfo, 50);
  
        //connections
  
        this.global.socket.on('render', this.Render);
  
        if (joinType == JoinType.Random) {
          this.global.socket.emit("joinRandomRoom", { jwtToken: cookies.get("token") }, (data: any) => {
            this.roomId = data.roomId;
            this.me = data.me;
          })
        }
  
        if (joinType == JoinType.Craete) {
          this.global.socket.emit("createRoom", { jwtToken: cookies.get("token") }, (data: any) => {
            this.roomId = data.roomId;
            this.roomPassword = data.roomPassword;
            this.me = Me.firstUser;
          })
        }
        if (joinType == JoinType.Player) {
          this.global.socket.emit("joinRoom", {
            jwtToken: cookies.get("token"), roomId: this.roomId, roomPassword: this.roomPassword
          }, (data: any) => {
            if (data.error != "") {
              alert(data.error);
              this.$router.push({ path: '/game' });
            }
            this.me = Me.lastUser;
          })
        }
        if (joinType == JoinType.Viewer) {
          this.global.socket.emit("viewRoom", {
            jwtToken: cookies.get("token"), roomId: this.roomId
          }, (data: any) => {
            if (data.error != "") {
              alert(data.error);
              this.$router.push({ path: '/game' });
            }
            this.me = Me.viewer;
          })
        }
  
        this.global.socket.on('finishGame', (data: any) => {
          if (this.me == Me.viewer) {
            this.DrawInfo("Game Finish");
            return;
          }
          if (data.winnerUser == this.me) {
            this.DrawInfo("You Win", "green");
          } else {
            this.DrawInfo("You Lose", "red");
          }
        });
  
      },
      LeaveGame() {
        this.global.socket?.emit("leaveGame");
        this.gameStarted = false;
        this.joinedGame = false;
        this.roomId = "";
        this.roomPassword = "";
        this.me = Me.viewer;
        this.pos = 210;
        this.firstUserInfo = null;
        this.lastUserInfo = null;
        this.viewersUserInfo = [] as string[];
      },
      CanvasEffectOld(context: any, canvas: any) {
  
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        //red effect
        for (let y = 0; y < canvas.height; y++) {
          for (let x = 30; x < canvas.width - 30; x++) {
            const index = y * canvas.width + x;
            data[index * 4 + 1] = 0;
            data[index * 4 + 2] = 0;
            data[index * 4 + 3] = 255;
          }
        }
        context.putImageData(imageData, 0, 0);
  
        //backround fill
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(0, 0, 0, 0.04)";
        context.fill();
  
        context.beginPath();
        context.rect(0, 0, 30, canvas.height);
        context.fillStyle = "black";
        context.fill();
  
        context.beginPath();
        context.rect(canvas.width - 30, 0, 30, canvas.height);
        context.fillStyle = "black";
        context.fill();
      },
      CanvasPintEffect(context: any, canvas: any) {
        context.beginPath();
        context.rect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "rgba(30, 30, 30, 1)";
        context.fill();
  
        var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        var data = imageData.data;
        //red effect
        for (let y = 30; y < canvas.height - 29; y += 10) {
          for (let x = 30; x < canvas.width - 29; x += 10) {
            const index = y * canvas.width + x;
            data[index * 4 + 0] = 255;
            data[index * 4 + 1] = 255;
            data[index * 4 + 2] = 255;
            data[index * 4 + 3] = 255;
          }
        }
        context.putImageData(imageData, 0, 0);
      },
      Render(data: any) {
        const color = "white"
  
        this.gameStarted = true;
        const firstUserPos = data.firstUserPos;
        const lastUserPos = data.lastUserPos;
        const ballPosX = data.ballPosX;
        const ballPosY = data.ballPosY;
        const firstUserHealth = data.firstUserHealth;
        const lastUserHealth = data.lastUserHealth;
  
        //get user info
        this.SetAllUsersInfo(data.firstUserId, data.lastUserId, data.viewersUserId);
  
        //get canvas
        var canvas: any = this.$refs['canvas']
        const context = canvas.getContext('2d', { willReadFrequently: true });
  
        //draw backround
        this.CanvasEffectOld(context, canvas);
        const dotSize = 40;
        for (let i = dotSize / 2; i < canvas.height; i += dotSize) {
          context.beginPath();
          context.rect(canvas.width / 2 - 2, i, 4, dotSize / 2);
          context.fillStyle = color;
          context.fill();
        }
  
        //draw ball
        context.beginPath();
        context.arc(ballPosX, ballPosY, 10, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
  
        //draw left
        context.beginPath();
        context.rect(20, firstUserPos, 10, 100);
        context.fillStyle = color;
        context.fill();
  
        context.beginPath();
        context.arc(25, firstUserPos, 5, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
  
        context.beginPath();
        context.arc(25, firstUserPos + 100, 5, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
  
        //draw right
        context.beginPath();
        context.rect(canvas.width - 30, lastUserPos, 10, 100);
        context.fillStyle = color;
        context.fill();
  
        context.beginPath();
        context.arc(canvas.width - 25, lastUserPos, 5, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
  
        context.beginPath();
        context.arc(canvas.width - 25, lastUserPos + 100, 5, 0, 2 * Math.PI);
        context.fillStyle = color;
        context.fill();
  
        //draw healths
        context.font = "20px serif";
        context.fillStyle = color;
        context.fillText("Health: " + firstUserHealth, 400 - 200 - 30, 25);
  
        context.font = "20px serif";
        context.fillStyle = color;
        context.fillText("Health: " + lastUserHealth, 400 + 200 - 30, 25);
  
      },
      DrawInfo(text = "Waiting Players", color = "white") {
        var canvas: any = this.$refs['canvas']
        const context = canvas.getContext('2d', { willReadFrequently: true });
  
        this.CanvasPintEffect(context, canvas);
  
        context.font = "48px serif";
        context.fillStyle = color;
        context.fillText(text, 400 - 150, 250);
      },
      CopyViewerLink() {
        const url = new URL(window.location.href);
        const link = url.origin + url.pathname;
  
        try {
          navigator.clipboard.writeText(link + "?roomId=" + this.roomId);
        } catch (err) {
          alert("kopyalama işlemini tarayıcınız desteklemiyor");
        }
      },
      CopyPlayerLink() {
        const url = new URL(window.location.href);
        const link = url.origin + url.pathname;
  
        try {
          navigator.clipboard.writeText(link + "?roomId=" + this.roomId + "&roomPassword=" + this.roomPassword);
        } catch (err) {
          alert("kopyalama işlemini tarayıcınız desteklemiyor");
        }
      },
      async SetAllUsersInfo(firstUserId: number, lastUserId: number, viewersUserId: number[]) {
        this.firstUserInfo = await this.GetUserInfo(firstUserId);
        this.lastUserInfo = await this.GetUserInfo(lastUserId);
        var newViewers = new Array(viewersUserId.length);
        for (let i = 0; i < viewersUserId.length; i++) {
          newViewers[i] = await this.GetUserInfo(viewersUserId[i]);
        }
        this.viewersUserInfo = newViewers;
      },
      async GetUserInfo(userId: number) {
        if (this.tmpUsers.has(userId)) {
          return this.tmpUsers.get(userId);
        }
  
        var responseInfo = await fetch(process.env.VUE_APP_BACKEND_URL + '/users' + '/user?id=' + userId, {
          headers: {
            'Authorization': 'Bearer ' + cookies.get("token")
          }
        });
        const info = await responseInfo.json();
        this.tmpUsers.set(userId, info);
        return this.tmpUsers.get(userId);
      }
    }
  });
  </script>
  
  