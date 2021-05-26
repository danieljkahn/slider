class Slider {
		constructor(slider, autobool) {
			let self = this;
			this.slider = slider;
			this.slides = document.querySelectorAll('.slide-entry');
			this.slideCount = this.slides.length; // count slides
			this.currentSlide = 0; // find a starting place for the current slide
			this.slideHeight = null; // we'll need this later for height calculation
			this.initialHeight = this.slides[0].clientHeight;
			this.slides[0].classList.add('active');
			this.slider.style.height = this.initialHeight + 'px';
			this.initialX = null;
			this.initialY = null;

			// slide handlers
			// next slide
			document.querySelector('#next-slide').addEventListener('click', function(){ self.nextSlide(self); });
			document.body.addEventListener('keydown', function(event){self.nextSlide(self,event)}, false);
			// prev slide
			document.querySelector('#prev-slide').addEventListener('click', function(){self.prevSlide(self) });
			document.body.addEventListener('keydown', function(event){self.prevSlide(self,event)}, false);

			window.addEventListener('resize', function() { // on browser resize
				self.resizedSlideHeight = self.slides[self.currentSlide].clientHeight; // get current slide height
				self.slider.style.height = self.resizedSlideHeight + 'px'; // update the height of the slider
			});

			if (autobool) {
				setInterval(function(){
					self.nextSlide(self);
				}, 5000);
			}

		}
		moveToSlide(n) { // declare slide navigation function
			console.log('moveToSlide');
			console.log(n);
			this.slides[this.currentSlide].className = 'slide-entry'; // assign the slide HTML element
			this.currentSlide = (n+this.slideCount)%this.slideCount; // determine the current slide
			this.slides[this.currentSlide].className = 'slide-entry active'; // if it's the current slide, add active class
			this.slideHeight = this.slides[this.currentSlide].clientHeight; // get the height of the current slide
			this.slider.style.height = this.slideHeight + 'px'; // set height of slides
		}
		nextSlide(self,event) {
			console.log('next');
			self.moveToSlide(this.currentSlide+1);
			if (event != undefined && event.keyCode == 39) {
				self.moveToSlide(this.currentSlide+1);
			}
		}
		prevSlide(self,event) {
			console.log('prev');
			self.moveToSlide(this.currentSlide+-1);
			let code = event.keyCode;
			if( event != undefined && event.keyCode == 37 ) {
				this.moveToSlide(this.currentSlide+-1);
			}
		}


		// DETECT SWIPE EVENTS
		startTouch(e) {
			this.initialX = e.touches[0].clientX;
			this.initialY = e.touches[0].clientY;
		}
		moveTouch(e) {
			if (this.initialX === null) {
				return;
			}
			if (this.initialY === null) {
				return;
			}
			let currentX = e.touches[0].clientX;
			let currentY = e.touches[0].clientY;
			let diffX = this.initialX - currentX;
			let diffY = this.initialY - currentY;
			if ( Math.abs(diffX) > Math.abs(diffY) ) { // sliding horizontally
				if (diffX > 0) { // swiped left
					this.moveToSlide(this.currentSlide+1);
				}
				else { // swiped right
					this.moveToSlide(this.currentSlide+-1);
				}
			} /// else to slide vertically, not needed in this case
			this.initialX = null;
			this.initialY = null;
			e.preventDefault();
		}
	}
