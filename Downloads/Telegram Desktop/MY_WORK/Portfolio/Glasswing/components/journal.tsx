"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { Plus, Trash2, Calendar } from "lucide-react"

interface JournalEntry {
  id: string
  date: string
  title: string
  content: string
}

export function Journal() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [currentEntry, setCurrentEntry] = useState<JournalEntry | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    // Load entries from localStorage
    const savedEntries = localStorage.getItem("glasswing_journal")
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries))
    }
  }, [])

  const saveEntry = () => {
    if (!title.trim() && !content.trim()) {
      toast({
        title: "Entry is empty",
        description: "Please add a title or some content to save your entry.",
        variant: "destructive",
      })
      return
    }

    const newEntry: JournalEntry = {
      id: currentEntry?.id || Date.now().toString(),
      date: currentEntry?.date || new Date().toISOString(),
      title: title || "Untitled",
      content,
    }

    let updatedEntries
    if (currentEntry) {
      updatedEntries = entries.map((e) => (e.id === currentEntry.id ? newEntry : e))
    } else {
      updatedEntries = [newEntry, ...entries]
    }

    setEntries(updatedEntries)
    localStorage.setItem("glasswing_journal", JSON.stringify(updatedEntries))

    toast({
      title: currentEntry ? "Entry updated! 📝" : "Entry saved! 📝",
      description: "Your thoughts are safely stored.",
    })

    // Reset form
    setTitle("")
    setContent("")
    setCurrentEntry(null)
  }

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter((e) => e.id !== id)
    setEntries(updatedEntries)
    localStorage.setItem("glasswing_journal", JSON.stringify(updatedEntries))

    if (currentEntry?.id === id) {
      setTitle("")
      setContent("")
      setCurrentEntry(null)
    }

    toast({
      title: "Entry deleted",
      description: "Your journal entry has been removed.",
    })
  }

  const loadEntry = (entry: JournalEntry) => {
    setCurrentEntry(entry)
    setTitle(entry.title)
    setContent(entry.content)
  }

  const newEntry = () => {
    setCurrentEntry(null)
    setTitle("")
    setContent("")
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-serif font-bold mb-2">Private Journal</h1>
          <p className="text-lg text-muted-foreground">A safe space for your thoughts</p>
        </div>
        <Button onClick={newEntry}>
          <Plus className="w-4 h-4 mr-2" />
          New Entry
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Entry List */}
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your Entries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
              {entries.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">No entries yet. Start writing!</p>
              ) : (
                entries.map((entry) => (
                  <div
                    key={entry.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:border-primary/50 ${
                      currentEntry?.id === entry.id ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => loadEntry(entry)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{entry.title}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(entry.date).toLocaleDateString()}
                        </p>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation()
                          deleteEntry(entry.id)
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Editor */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{currentEntry ? "Edit Entry" : "New Entry"}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Entry title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-lg font-medium"
                />
              </div>

              <div>
                <Textarea
                  placeholder="What's on your mind? This is your private space to express anything you're feeling..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={15}
                  className="resize-none"
                />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">{content.length} characters</p>
                <div className="flex gap-2">
                  {currentEntry && (
                    <Button variant="outline" onClick={newEntry}>
                      Cancel
                    </Button>
                  )}
                  <Button onClick={saveEntry}>{currentEntry ? "Update Entry" : "Save Entry"}</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompts */}
          <Card className="mt-6 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-lg">Writing Prompts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">💭 What made you smile today, even if just for a moment?</p>
              <p className="text-sm text-muted-foreground">🌟 What's one thing you're grateful for right now?</p>
              <p className="text-sm text-muted-foreground">💪 What challenge did you face, and how did you respond?</p>
              <p className="text-sm text-muted-foreground">🎯 What do you need to let go of?</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
