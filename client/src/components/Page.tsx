import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

type PageProps = {
  children?: React.ReactNode
  midWidth?: boolean
  title: string
}

export function Page({ children, midWidth, title }: PageProps) {
  return (
    <Grid container justify="center">
      <Grid item xs={12} sm={midWidth ? 6 : 12}>
        <Grid container direction="column" spacing={5}>
          <Grid item>
            <Grid container>
              <Grid item>
                <Typography variant="h2" component="h2">
                  {title}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>{children}</Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
