import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import type { FormEventHandler } from 'react'

import { partialResetInterrogation } from '@/federation/partialResetInterrogation'

export function PartialReset() {
  const onSubmit: FormEventHandler = (e) => {
    try {
      e.preventDefault()
      const id = new FormData(e.currentTarget as HTMLFormElement)
        .get('id')
        ?.toString()
      if (!id) {
        throw new Error("Vous devez entrer un ID d'interrogation valide")
      }
      partialResetInterrogation(id)
    } catch (e) {
      console.error(e)
      alert(`Cannot call partialResetInterrogation ${e}`)
    }
  }
  return (
    <Stack gap={4} style={{ maxWidth: 700, marginInline: 'auto' }}>
      <Typography variant="h3">Test partial reset</Typography>
      <form onSubmit={onSubmit}>
        <Stack gap={2}>
          <TextField name="id" label="Interrogation Id" defaultValue="i0" />
          <Button variant="contained" type="submit">
            Partial reset
          </Button>
        </Stack>
      </form>
    </Stack>
  )
}
