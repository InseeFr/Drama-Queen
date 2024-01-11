import { tss } from 'tss-react/mui';

type ComponentDisplayerProps = {};

export function ComponentDisplayer(props: ComponentDisplayerProps) {
  const { classes } = useStyles();

  return <div></div>;
}

const useStyles = tss.create(() => ({}));
