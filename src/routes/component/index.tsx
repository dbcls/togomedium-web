import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/component/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/component/"!</div>
}
