<template>
<div id="app">

  <header id="header">
    <h1>Trading Trading Cards Traders</h1>
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/Collection">User</router-link>
      <router-view />
    </nav>
  </header>
  <div class="footer">
    <p>Hours Worked = 15 Hours</p>
    <a href="https://github.com/Caleb-Gregory/TradingTradingCardsTraders">github</a>
  </div>
</div>
</template>


<style>
. . .
/* Footer */

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 90px;
  background-color: #D0DAEE;
  padding-bottom: 20px;
}

a {
  color: inherit;
  text-decoration: none;
  border-bottom: 3px solid #fff3;
}

a:hover {
  border-bottom-color: #ffffff;
}


p {
  max-width: 700px;
  margin: 0;
  padding: 20px;
}

body {
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  margin: 0px 200px;
  background-color: #7577a1;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #09091;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
