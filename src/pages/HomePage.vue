<template>
  <section class="home" :style="{ backgroundImage: backgroundUrl }">
    <section class="home-container">
      <div class="home-introduce">
        <img src="../assets/images/logo.png" alt="logo house hotel" />
        <section class="introduce-text">
          <p><strong>好室旅店。HOUSE HOTEL</strong></p>
          <p>花蓮縣花蓮市國聯一路1號</p>
          <p>03-8321155</p>
          <p>HOUSE@HOTEL.COM</p>
        </section>
        <form class="introduce-carousel">
          <label v-for="(item, index) of backgroundOption" :key="index" :for="'background' + item">
            <input
              :id="'background' + item"
              v-model="background"
              type="radio"
              :name="'background' + item"
              :value="item"
            />
            <span></span>
          </label>
        </form>
      </div>
      <div class="home-room-list">
        <div class="row">
          <div v-for="room of rooms" :key="room.name" class="col">
            <a :style="{ background: 'url(' + room.url + ') center / cover no-repeat' }">
              <p>
                <span>{{ room.name }}</span>
              </p>
            </a>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import { ref, computed } from 'vue'
  import bg1 from '../assets/images/house/bg1.png'
  import bg2 from '../assets/images/house/bg2.png'
  import bg3 from '../assets/images/house/bg3.png'
  import bg4 from '../assets/images/house/bg4.png'
  import room1 from '../assets/images/house/room1.png'
  import room2 from '../assets/images/house/room2.png'
  import room3 from '../assets/images/house/room3.png'
  import room4 from '../assets/images/house/room4.png'
  import room5 from '../assets/images/house/room5.png'
  import room6 from '../assets/images/house/room6.png'

  export default {
    name: 'HomePage',
    setup() {
      const background = ref(1)
      const backgroundUrls = [bg1, bg2, bg3, bg4]
      const backgroundUrl = computed(() => `url(${backgroundUrls[background.value]})`)

      return {
        background,
        backgroundUrl,
        backgroundUrls,
        backgroundOption: [0, 1, 2, 3],
        rooms: [
          { name: 'Single Room', url: room1 },
          { name: 'Double Room', url: room2 },
          { name: 'Twin Room', url: room3 },
          { name: 'Deluxe Single Room', url: room4 },
          { name: 'Deluxe Double Room', url: room5 },
          { name: 'Deluxe Twin Room', url: room6 },
        ],
      }
    },
  }
</script>

<style lang="scss">
  @import '../assets/styles/reset.scss';
</style>

<style lang="scss" scoped>
  .home {
    background-size: cover;
    min-height: 100vh;
  }

  .home-container {
    display: flex;
    justify-content: space-between;
    width: 82%;
    max-width: 1110px;
    margin: 0 auto;
    padding-top: 109px;
  }

  .home-introduce {
    padding: 10px 9px;

    .introduce-text {
      margin-left: -9px;
      margin-bottom: 51px;

      strong {
        font-weight: normal;
      }

      p {
        &:nth-of-type(1) {
          margin-bottom: 16px;
        }
        color: #fff;
        font-size: 12px;
        font-family: 'Noto Sans CJK TC';
        font-weight: 300;
      }
    }

    .introduce-carousel {
      text-align: center;
      font-size: 0;

      label {
        display: inline-block;
        font-size: 0;
        cursor: pointer;
        margin-right: 12px;
      }

      input {
        width: 0;
        height: 0;
        opacity: 0;
      }

      input:hover ~ span {
        background-color: rgba(255, 255, 255, 0.45);
      }

      input:checked ~ span {
        background-color: #fff;
      }

      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background-color: transparent;
        border-radius: 12px;
        border: 1px solid #fff;
      }
    }

    img {
      margin-bottom: 185.22px;
    }
  }

  .home-room-list {
    .row {
      display: flex;
      width: 825px;
      flex-wrap: wrap;
    }

    .col {
      flex: 0 1 33.33%;
    }

    .col a {
      display: block;
      height: 233px;
      font-size: 0px;
      background-position: center;
      background-size: cover;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      p {
        opacity: 0;
        transition: all 0.3s ease-in-out;
        font-size: 19px;
        font-family: 'Open Sans', sans-serif;
        text-align: center;
        font: normal normal normal 19px/26px Open Sans;
        color: #fff;
        background: linear-gradient(to right, #38470b60, #38470b60);

        &::before {
          vertical-align: middle;
          content: '';
          display: inline-block;
          width: 0;
          height: 233px;
        }
      }

      &:nth-of-type(1):hover p {
        opacity: 1;
      }
    }
  }
</style>
