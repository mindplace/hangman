Todo

[] tests
[] make circle radius more responsive / drawn correctly

```js
  var circle = document.getElementsByClassName('progress-circle')[0];
  circle.css('top', (circle.width() / 4 - 27.5) + 'px');
```

```css
.circle-container {
  position: relative
  .progress-circle {
   position: absolute
   top: 25%
   left: 0
   width: 100%
  }
  .circle-interior {
   display: block
   text-align: center
   font-size: 24px
   font-weight: 400
   color: #f55772
  }
  .label {
   display: block
   text-align: center
   font-size: 13px
   font-weight: 400
   color: #283b62
   text-transform: uppercase
   padding-top: 10px
  }
}
```
