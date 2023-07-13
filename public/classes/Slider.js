export default class Slider {
  constructor(name, range = [0, 50, 100, 1]) {
    const scope = this;

    this.details = document.createElement('details');
    this.details.open = true;

    let summary = document.createElement('summary');
    summary.appendChild(document.createTextNode(name));

    this.details.appendChild(summary);

    this.slider = document.createElement('input');
    this.slider.setAttribute('type', 'range');
    this.slider.setAttribute('min', range[0] ?? 0);
    this.slider.setAttribute('max', range[2] ?? 100);
    this.slider.setAttribute('value', range[1] ?? 50);
    this.slider.setAttribute('step', range[3] || 1);
    this.slider.oninput = function () {
      if (!this.value) return;
      scope.output.innerHTML = this.value;
      scope.input.value = this.value;
      scope.onChange(this.value);
    };

    this.input = document.createElement('input');
    this.input.setAttribute('type', 'number');
    this.input.setAttribute('value', range[1] ?? 50);
    this.input.style.width = '100%';
    this.input.onchange = function () {
      if (!this.value) return;
      scope.output.innerHTML = this.value;
      scope.slider.value = this.value;
      scope.onChange(this.value);
    };

    this.output = document.createElement('p');
    this.output.appendChild(document.createTextNode(range[1]));

    this.details.appendChild(this.slider);
    this.details.appendChild(this.input);
    this.details.appendChild(this.output);

    document.querySelector('main').appendChild(this.details);
  }
  onChange() {}
}
