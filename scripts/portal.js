"use strict";

function Portal(sites) {
  this.el = document.createElement("div");
  this.el.id = "portal";
  this.sites = sites;

  // Templates

  function _readme() {
    return `<p class='readme'>Welcome to our webring of calendars for <a href='https://tinyfactories.space'>Tiny Factories</a>.<br/><br/></p>
    <p>If you ended up on this page as part of your <a href='https://tiny-factories.typeform.com/to/hotpAx'>Tiny Factories Community application</a>, then please set up a time with one of our members listed above to complete the application.</p> <br/><br/>
    <p>Of course, if you just discovered this page organically would still love to chat too. </p><br/><br/>`;
  }

  function _buttons() {
    return `<p class='buttons'><a href='#random' onClick="portal.reload('random')">Calendar Randomizer</a> | <a href='https://tinyfactories.space'>Tiny Factories</a> <a id='icon'  href='#random' onClick="portal.reload('random')"></a> | <a href="https://garden.tinyfactories.space">Tiny Garden Community</a></p>`;
  }

  function _directory(sites) {
    return `
    <ul>${sites.reduce((acc, site, id) => {
      return `${acc}<li class='${
        site.type
      }'><span class='counter'>${id})</span><a href='${site.url}'>${_name(
        site
      )}</a></li>`;
    }, "")}</ul>\n${_readme()}${_buttons()}`;
  }

  function _name(site) {
    return site.title ? site.title : `${site.url.split("//")[1]}`;
  }

  function _redirect(site) {
    return `<p>Redirecting to <a href="${site.url}">${site.url}</a></p><meta http-equiv="refresh" content="3; url=${site.url}">
    <p class='buttons'><a href='#' onClick="portal.reload('')">Directory</a> | <a href='#${site.url}' onClick="portal.reload('random')">Skip</a> | <a href='#random' onClick="portal.reload('random')">Random</a> | <a href='https://tinyfactories.space'>Information</a> <a id='icon'  href='#random' onClick="portal.reload('random')"></a></p>`;
  }

  //

  this.install = function (host) {
    host.appendChild(this.el);
  };

  this.start = function () {
    this.el.innerHTML =
      window.location.hash && window.location.hash.length > 4
        ? _redirect(this.next())
        : _directory(this.sites);
  };

  this.reload = function () {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  this.navigate = function (target) {
    setTimeout(() => {
      window.location.href = target;
    }, 3000);
  };

  this.locate = function () {
    const hash = window.location.hash.replace("#", "").trim();

    if (hash == "random") {
      return Math.floor(Math.random() * this.sites.length);
    }

    for (const id in this.sites) {
      const site = this.sites[id];
      if (site.url.indexOf(hash) > -1) {
        return parseInt(id);
      }
    }
    return -1;
  };

  this.next = function (loc = this.locate()) {
    return loc == this.sites.length - 1 ? this.sites[0] : this.sites[loc + 1];
  };
}
