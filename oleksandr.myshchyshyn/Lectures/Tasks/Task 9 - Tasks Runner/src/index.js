import '../src/index.less';

(function() {
  const name = 'basecamp';

  let obj = {
    name,
    logName() {
      alert(this.name);
    }
  };

  obj.logName();
})();
