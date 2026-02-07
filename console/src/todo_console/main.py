import sys
from rich.console import Console
from rich.table import Table
from rich.panel import Panel
from rich.prompt import Prompt, IntPrompt

from todo_console.store import TaskStore

console = Console()
store = TaskStore()


def show_menu() -> None:
    console.print(
        Panel(
            "[1] Add Task\n[2] View Tasks\n[3] Update Task\n[4] Toggle Complete\n[5] Delete Task\n[6] Exit",
            title="Todo App - Menu",
            border_style="cyan",
        )
    )


def add_task() -> None:
    title = Prompt.ask("[bold green]Task title[/]")
    description = Prompt.ask("[green]Description (optional)[/]", default="")
    task = store.add_task(title, description)
    console.print(f"[bold green]✓ Task #{task.id} created:[/] {task.title}")


def view_tasks() -> None:
    tasks = store.get_all_tasks()
    if not tasks:
        console.print("[yellow]No tasks yet. Add one![/]")
        return

    table = Table(title="Your Tasks", show_lines=True)
    table.add_column("ID", style="cyan", justify="center")
    table.add_column("Title", style="white")
    table.add_column("Description", style="dim")
    table.add_column("Status", justify="center")
    table.add_column("Created", style="dim")

    for t in tasks:
        status = "[bold green]Done[/]" if t.completed else "[yellow]Pending[/]"
        table.add_row(
            str(t.id),
            t.title,
            t.description or "-",
            status,
            t.created_at.strftime("%Y-%m-%d %H:%M"),
        )
    console.print(table)


def update_task() -> None:
    view_tasks()
    task_id = IntPrompt.ask("[bold blue]Task ID to update[/]")
    title = Prompt.ask("[blue]New title (enter to skip)[/]", default="")
    description = Prompt.ask("[blue]New description (enter to skip)[/]", default="")
    task = store.update_task(
        task_id,
        title=title or None,
        description=description or None,
    )
    if task:
        console.print(f"[bold green]✓ Task #{task.id} updated[/]")
    else:
        console.print("[bold red]✗ Task not found[/]")


def toggle_complete() -> None:
    view_tasks()
    task_id = IntPrompt.ask("[bold blue]Task ID to toggle[/]")
    task = store.toggle_complete(task_id)
    if task:
        state = "completed" if task.completed else "pending"
        console.print(f"[bold green]✓ Task #{task.id} marked as {state}[/]")
    else:
        console.print("[bold red]✗ Task not found[/]")


def delete_task() -> None:
    view_tasks()
    task_id = IntPrompt.ask("[bold red]Task ID to delete[/]")
    if store.delete_task(task_id):
        console.print(f"[bold green]✓ Task #{task_id} deleted[/]")
    else:
        console.print("[bold red]✗ Task not found[/]")


def main() -> None:
    console.print(
        Panel("[bold cyan]Welcome to the Todo Console App![/]", border_style="cyan")
    )

    actions = {
        1: add_task,
        2: view_tasks,
        3: update_task,
        4: toggle_complete,
        5: delete_task,
    }

    while True:
        show_menu()
        try:
            choice = IntPrompt.ask("[bold]Choose an option[/]")
        except (KeyboardInterrupt, EOFError):
            break

        if choice == 6:
            console.print("[bold cyan]Goodbye![/]")
            sys.exit(0)

        action = actions.get(choice)
        if action:
            action()
        else:
            console.print("[bold red]Invalid choice. Try again.[/]")


if __name__ == "__main__":
    main()
