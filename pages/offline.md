---
title: "Oops, you're offline..."
permalink: /offline/
layout: page
---

Thanks to Service Workers, you can still visit the pages you've visited already.

To visit something else, it'll have to wait until you're back online. Soon let's hope!

<script markdown="0" defer="defer>
  ga('send', 'event', 'OFF', 'display', 'From offline', '{{ page.url }}');
</script>