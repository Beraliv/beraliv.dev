<template>
  <footer>
    <logo-link
      class="link github"
      href="https://github.com/Beraliv"
      iconClass="github-icon"
      iconSrc='/github.svg'
      aria-label="Visit my GitHub page"
    />
    <logo-link
      class="link linkedin"
      href="https://www.linkedin.com/in/beraliv"
      iconClass="linkedin-icon"
      iconSrc='/linkedin.svg'
      aria-label="Visit my LinkedIn page"
    />
    <logo-link
      class="link twitter"
      href="https://twitter.com/beraliv"
      iconClass="twitter-icon"
      iconSrc='/twitter.svg'
      aria-label="Visit my Twitter page"
    />
    <logo-link
      class="link medium"
      href="https://medium.com/@beraliv"
      iconClass="medium-icon"
      iconSrc='/medium.svg'
      aria-label="Visit my Medium blog page"
    />
    <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
  </footer>
</template>

<script>
import LogoLink from '~/components/LogoLink.vue'

export default {
  components: {
    LogoLink,
  }
}
</script>

<style>
footer {
  display: flex;
  margin-bottom: 18px;
}

footer > div:last-child {
  display: none;
}

.link {
  width: 50px;
  height: 50px;
  margin: 10px;
  text-decoration: none;
}
</style>