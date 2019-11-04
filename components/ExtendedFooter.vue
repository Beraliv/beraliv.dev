<template>
  <footer>
    <logo-link
      class="link github"
      href="https://github.com/Beraliv"
      iconClass="github-icon"
      aria-label="Visit my GitHub page"
    />
    <logo-link
      class="link linkedin"
      href="https://www.linkedin.com/in/beraliv"
      iconClass="linkedin-icon"
      aria-label="Visit my LinkedIn page"
    />
    <logo-link
      class="link twitter"
      href="https://twitter.com/beraliv"
      iconClass="twitter-icon"
      aria-label="Visit my Twitter page"
    />
    <logo-link
      class="link medium"
      href="https://medium.com/@beraliv"
      iconClass="medium-icon"
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

.github-icon {
  background-image: url('/github.svg');
}

.linkedin-icon {
  background-image: url('/linkedin.svg');
}

.twitter-icon {
  background-image: url('/twitter.svg');
}

.medium-icon {
  background-image: url('/medium.svg');
}
</style>