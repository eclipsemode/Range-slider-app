<h2>Slider Plugin (beta)</h2>
<h6>Development in progress...</h6>
<hr>
<a href="https://eclipsemode.github.io/Jquery-range-app" target="_blank">--- Watch Demo ---</a>
<h3>Libraries:</h3>
<hr>
<ul>
<li>Jquery: 3.6.0</li>
<li>Webpack: 5.72.0</li>
<li>Typescript: 4.6.4</li>
<li>Pug: 3.0.2</li>
<li>SASS: 1.51.0</li>
<li>Jest: 28.1.0</li>
<li>Jsdom: 19.0.0</li>
<li>Eslint: 8.14.0</li>
</ul>

<h3>Commands:</h3>
<hr>
<p>Commands call with <code>npm</code> or <code>yarn</code>.</p>
<p>Install dependencies: <code>npm i</code> or <code>yarn</code>.</p>
<p>Start tests with: <code>npm run test</code> or <code>yarn test</code></p>
<p>Start development server: <code>npm start</code></p>
<p>Assemble the project with command: <code>npm run build</code> </p>

<h3>Slider initialization:</h3>
<hr>
<pre>
import Slider-plugin;

new Slider-plugin('.slider', {...})
</pre>

<h4>User options: </h4>
<table>
<thead>
<td>Name</td>
<td>Type</td>
<td>Default value</td>
<td>Description</td>
</thead>
<tbody>
<tr>
<td>min</td>
<td>number</td>
<td>0</td>
<td>Minimum value</td>
</tr>
<tr>
<td>max</td>
<td>number</td>
<td>1000</td>
<td>Maximum value</td>
</tr>
<tr>
<td>step</td>
<td>number</td>
<td>0.1</td>
<td>Step if thumbs</td>
</tr>
<tr>
<td>from</td>
<td>number</td>
<td>0</td>
<td>Value of first / min thumb</td>
</tr>
<tr>
<td>to</td>
<td>number</td>
<td>1000</td>
<td>Value of second / max thumb</td>
</tr>
<tr>
<td>range</td>
<td>boolean</td>
<td>false</td>
<td>Double / single range slider</td>
</tr>
<tr>
<td>vertical</td>
<td>boolean</td>
<td>false</td>
<td>Orientation</td>
</tr>
<tr>
<td>progress</td>
<td>boolean</td>
<td>true</td>
<td>Scale display</td>
</tr>
<tr>
<td>tooltip</td>
<td>boolean</td>
<td>true</td>
<td>Show tooltip above thumbs</td>
</tr>
</tbody>
</table>

<h3>Architecture:</h3>
<hr>
Architecture of slider based on MVP pattern. 
Application divided on 3 components - <code>Model</code>, <code>View</code>, <code>Controller</code>, 
and this components synchronized with <code>Observer</code> subscriptions.

<h3>UML:</h3>
<hr>
In progress...