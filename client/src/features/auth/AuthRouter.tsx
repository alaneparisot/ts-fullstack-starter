import { lazy, Suspense } from 'react'
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom'

import { RELATIVE_LOGIN_ROUTE } from '.'
import { PageFallback } from '../../components'

const Login = lazy(() =>
  /**
   * Workaround to overcome "React.lazy currently only supports default exports."
   * @see https://reactjs.org/docs/code-splitting.html#named-exports
   * @see https://stackoverflow.com/a/66289130
   */
  import('./Login').then((module) => ({ default: module.Login })),
)

export function AuthRouter() {
  const match = useRouteMatch()

  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path={`${match.path}${RELATIVE_LOGIN_ROUTE}`}>
          <Login />
        </Route>
        <Route path="*">
          <Redirect to={`${match.path}${RELATIVE_LOGIN_ROUTE}`} />
        </Route>
      </Switch>
    </Suspense>
  )
}
