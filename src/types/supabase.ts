export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      answers: {
        Row: {
          answer: string
          created_at: string | null
          id: string
          keywords: string[] | null
          label: string | null
          question_id: string
          score: number | null
          user_id: string
        }
        Insert: {
          answer: string
          created_at?: string | null
          id?: string
          keywords?: string[] | null
          label?: string | null
          question_id: string
          score?: number | null
          user_id: string
        }
        Update: {
          answer?: string
          created_at?: string | null
          id?: string
          keywords?: string[] | null
          label?: string | null
          question_id?: string
          score?: number | null
          user_id?: string
        }
      }
      options: {
        Row: {
          created_at: string | null
          id: string
          option: string
          question_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          option: string
          question_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          option?: string
          question_id?: string
        }
      }
      questions: {
        Row: {
          created_at: string | null
          id: string
          question: string
          question_type: string
          survey_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          question: string
          question_type: string
          survey_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          question?: string
          question_type?: string
          survey_id?: string
        }
      }
      survey: {
        Row: {
          created_at: string
          id: string
          survey_title: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          survey_title: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          survey_title?: string
          user_id?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      http: {
        Args: {
          request: Database["public"]["CompositeTypes"]["http_request"]
        }
        Returns: unknown
      }
      http_delete:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
      http_get:
        | {
            Args: {
              uri: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_head: {
        Args: {
          uri: string
        }
        Returns: unknown
      }
      http_header: {
        Args: {
          field: string
          value: string
        }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
      }
      http_list_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_post:
        | {
            Args: {
              uri: string
              content: string
              content_type: string
            }
            Returns: unknown
          }
        | {
            Args: {
              uri: string
              data: Json
            }
            Returns: unknown
          }
      http_put: {
        Args: {
          uri: string
          content: string
          content_type: string
        }
        Returns: unknown
      }
      http_reset_curlopt: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      http_set_curlopt: {
        Args: {
          curlopt: string
          value: string
        }
        Returns: boolean
      }
      update_answer_data: {
        Args: {
          uuid_arg: string
        }
        Returns: undefined
      }
      urlencode:
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              string: string
            }
            Returns: string
          }
        | {
            Args: {
              data: Json
            }
            Returns: string
          }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      http_header: {
        field: string
        value: string
      }
      http_request: {
        method: unknown
        uri: string
        headers: unknown
        content_type: string
        content: string
      }
      http_response: {
        status: number
        content_type: string
        headers: unknown
        content: string
      }
    }
  }
}
