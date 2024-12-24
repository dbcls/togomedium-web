import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/statistics')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/statistics"!</div>
}
