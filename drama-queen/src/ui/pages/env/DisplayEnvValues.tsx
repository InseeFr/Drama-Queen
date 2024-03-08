import React from 'react'
import './env.css'
import { t } from 'i18n/build-dictionary'

export function DisplayEnvValues() {
  return (
    <div className="App">
      <h1>{t('envVariables')}</h1>
      <div className="card">
        <p className="read-the-docs">
          {Object.entries(import.meta.env)
            .filter(([k]) => k.startsWith('VITE'))
            .map(([k, v]) => (
              <React.Fragment key={k}>
                <b>{k}</b> : {v}
                <br />
              </React.Fragment>
            ))}
        </p>
      </div>
    </div>
  )
}
