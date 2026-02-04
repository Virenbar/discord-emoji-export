<template>
  <div id="tokenModal" class="modal fade" tabindex="-1" aria-labelledby="tokenHelp" aria-hidden="true">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 id="tokenHelp" class="modal-title fs-5">
            How to get Token
          </h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
        </div>
        <div class="modal-body">
          <h5> Using network tab</h5>
          <ul>
            <li>
              Open development console (<span class="badge bg-secondary">F12</span> or <span class="badge bg-secondary">Ctrl + Shift + I</span>)
            </li>
            <li>Switch channel or server in Discord</li>
            <li>Go to <strong>Network</strong> tab</li>
            <li>Turn on XHR filter</li>
            <li>Select any request</li>
            <li>Find <span class="badge bg-secondary">authorization</span> header</li>
          </ul>
          <img src="/images/network.png">
          <h5> Using application tab (browser only)</h5>
          <ul>
            <li>
              Open development console (<span class="badge bg-secondary">F12</span> or <span class="badge bg-secondary">Ctrl + Shift + I</span>)
            </li>
            <li>Go to <strong>Application</strong> tab</li>
            <li>Select local storage</li>
            <li>Search for <span class="badge bg-secondary">token</span> key</li>
          </ul>
          <img src="/images/application.png">
        </div>
      </div>
    </div>
  </div>
</template>
