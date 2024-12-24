import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/strain/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/component/"!</div>
}
