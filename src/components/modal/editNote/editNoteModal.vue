<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <button class="modal-default-button" @click="$emit('close')">
              &times;
            </button>
            <slot name="header"> default header </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> default body </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer"> </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script></script>

<style lang="sass">
p
	margin-bottom: 4px
.modal-mask
	position: fixed
	z-index: 9998
	top: 0
	left: 0
	width: 100%
	height: 100%
	background-color: rgba(0, 0, 0, .5)
	display: table
	transition: opacity .3s ease

.modal-wrapper
	display: table-cell
	vertical-align: middle

.modal-container
	width: 300px
	margin: 0px auto
	padding: 20px 30px
	background-color: #fff
	border-radius: 2px
	box-shadow: 0 2px 8px rgba(0, 0, 0, .33)
	transition: all .3s ease
	font-family: Helvetica, Arial, sans-serif

.modal-header h3
	margin-top: 0
	color: #42b983

.modal-body
	margin: 20px 0
	form
		input, textarea
			width: 80%
		textarea
			min-height: 100px

.modal-default-button
	background-color: transparent
	color: #D24444
	border: none
	font-size: 22px
	float: right

.modal-enter
	opacity: 0

.modal-leave-active
	opacity: 0

.modal-enter .modal-container,
.modal-leave-active .modal-container
	-webkit-transform: scale(1.1)
	transform: scale(1.1)
@media screen and (max-width: 600px)
	.modal-container
		width: 80%
</style>
