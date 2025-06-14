<script setup lang="ts">
import { nextTick, ref } from "vue";
import logo from "/src/assets/where-is-my-web-light.excalidraw.svg";
import search from "/src/assets/search.svg";
import enter from "/src/assets/enter.svg";

// 变量区

var searchBarText = "";
var enterIconShow = ref(false);

// 方法区

interface SearchMeta {
  name: string;
  value: string;
}

const SEARCH_TIP_COLUMN = ref<SearchMeta[]>([
  {
    name: "archive.org",
    value: "https://web.archive.org/web/*/",
  },
  {
    name: "archive.is",
    value: "http://archive.is/",
  },
]);

const isBlank = (param: string) => {
  return param.trim().length === 0;
};
const openNewTab = (url: string) => {
  window.open(url, "_blank");
};
const handleJumpUrl = (index: number) => {
  if (isBlank(searchBarText)) {
    return;
  }
  const url = SEARCH_TIP_COLUMN.value[index]?.value;
  var targetUrl = url + searchBarText.trim();
  if (index === 0) {
    // archive.org
    targetUrl += "*";
  }
  openNewTab(targetUrl);
};
const handleEnterSearch = () => {
  handleJumpUrl(0);
  handleJumpUrl(1);
};
const calculateTipShow = async () => {
  // NOTE:
  // VUE2 using following:
  // this.$set(enterIconShow, !isBlank(searchBarText))
  // --- error use case is following:
  // enterIconShow = ref(!isBlank(searchBarText))
  // enterIconShow = ref(true);
  enterIconShow.value = !isBlank(searchBarText); // NOTE: 通过 .value 修改 ref 的值
};
</script>

<template>
  <div class="container">
    <div class="logo">
      <img alt="Logo" :src="logo" />
    </div>
    <div class="bar">
      <input
        v-model="searchBarText"
        class="searchbar"
        type="text"
        title="Search"
        placeholder="Paste your missing url or keywords"
        @input="calculateTipShow"
        @keyup.enter="handleEnterSearch"
      />
      <img
        :src="search"
        @click="handleEnterSearch"
        class="search-icon"
        title="Search icon"
      />
      <img :src="enter" v-show="enterIconShow" class="search-tip" />
    </div>
    <div class="buttons">
      <button
        v-for="(column, index) in SEARCH_TIP_COLUMN"
        @click="handleJumpUrl(index)"
        class="button"
        type="button"
      >
        {{ column.name }}
      </button>
    </div>

    <footer class="footer">
      Service inspired by my
      <a
        href="https://bgzo.github.io/vault/how-to/archive-or-cache-web-on-internet"
        >notes</a
      >. Feel free to give me
      <a href="https://github.com/bGZo/where-is-my-web/issues">issues</a>
      <br />
      Made by <a href="https://github.com/bGZo/">bGZo</a> @ 2025
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  min-width: 100%;
  padding: 20px 250px 20px 250px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box; /* 确保padding不影响宽度计算 */
}

.logo {
  margin-bottom: 20px;
  text-align: center;
}

.logo img {
  height: 180px;
}

.bar {
  width: 100%;
  position: relative;
  margin-bottom: 28px;
}

.searchbar {
  width: 100%;
  height: 46px;
  border: 1px solid #dfe1e5;
  border-radius: 24px;
  padding: 0 40px 0 50px;
  font-size: 16px;
  outline: none;
  box-shadow: 0 1px 6px rgba(32, 33, 36, 0.08);
  transition: box-shadow 0.3s ease;
}

.searchbar:hover,
.searchbar:focus {
  box-shadow: 0 1px 10px rgba(32, 33, 36, 0.18);
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9aa0a6;
  width: 20px;
  height: 20px;
}

.search-tip {
  color: #70757a;
  font-size: 10px;
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
}

.buttons {
  display: flex;
  gap: 12px;
}

.button {
  background-color: #f8f9fa;
  border: 1px solid #f8f9fa;
  border-radius: 4px;
  color: #3c4043;
  font-size: 14px;
  padding: 10px 16px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.button:hover {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  background-color: #f8f9fa;
  border: 1px solid #dadce0;
  color: #202124;
}

.footer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #f2f2f2;
  padding: 15px 30px;
  color: #70757a;
  font-size: 14px;
  border-top: 1px solid #dadce0;
  a {
    color: hsla(160, 100%, 37%, 1);
    text-decoration: none;
    padding: 0;
    position: relative;
    border: 0;
    text-decoration-style: dashed;
  }

  a::before {
    content: "";
    display: block;
    position: absolute;
    height: 0.5em;
    bottom: 2px;
    left: 4px;
    width: 100%;
    --bg-opacity: 0.75;
    background-color: #70757a;
    opacity: 0.5;
    transition: transform 0.3s ease;
    transform: scaleX(0);
    transform-origin: bottom right;
  }
  a:hover::before {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
  a:hover {
    text-decoration: none;
  }
}

.voice {
  height: 20px;
  position: relative;
  top: 5px;
  left: 10px;
}

/* 响应式设计 */
@media (max-width: 600px) {
  .buttons {
    flex-direction: column;
    width: 100%;
  }
}
</style>
