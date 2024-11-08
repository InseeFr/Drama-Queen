import { useTranslation } from 'i18n'
import React from 'react'
import './env.css'
export function DisplayEnvValues() {
  const { t } = useTranslation('envValuesMessage')
  return (
    <div className="App">
      <h1>Drama Queen v{import.meta.env.APP_VERSION}</h1>
      <h3>{t('envVariables')}</h3>
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
