using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.Events;
using UnityEngine.SceneManagement;

/// <summary>
/// Puente entre la novela (Unity WebGL) y la aplicación web React.
///
/// USO:
/// 1. Crea en tu escena inicial un GameObject llamado exactamente "ReactBridge".
/// 2. Añádele este script. Se conserva entre escenas (DontDestroyOnLoad).
/// 3. React → Unity: React llama a LoadChapter("inundacion" | "terremoto" | "incendio").
/// 4. Unity → React: llama a ReactBridge.OpenMap(), ReactBridge.ChapterCompleted("inundacion"), etc.
/// </summary>
public class ReactBridge : MonoBehaviour
{
    public static ReactBridge Instance { get; private set; }

    [System.Serializable]
    public class ChapterScene
    {
        [Tooltip("Id del capítulo enviado por React: inundacion, terremoto o incendio")]
        public string chapterId;
        [Tooltip("Nombre de la escena de Unity que corresponde a ese capítulo")]
        public string sceneName;
    }

    [Tooltip("Relación capítulo → escena")]
    public ChapterScene[] chapters =
    {
        new ChapterScene { chapterId = "inundacion", sceneName = "Cap1_Inundacion" },
        new ChapterScene { chapterId = "terremoto",  sceneName = "Cap2_Terremoto" },
        new ChapterScene { chapterId = "incendio",   sceneName = "Cap3_Incendio" },
    };

    [Tooltip("Evento opcional si prefieres manejar la carga del capítulo tú mismo")]
    public UnityEvent<string> onChapterRequested;

    public string CurrentChapter { get; private set; }

#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")] private static extern void SendToReact(string type, string payload);
#else
    private static void SendToReact(string type, string payload) =>
        Debug.Log($"[ReactBridge] → React: {type} ({payload})");
#endif

    private void Awake()
    {
        if (Instance != null && Instance != this) { Destroy(gameObject); return; }
        Instance = this;
        DontDestroyOnLoad(gameObject);
    }

    // ───────────── React → Unity ─────────────

    /// <summary>Llamado desde React con SendMessage("ReactBridge", "LoadChapter", id).</summary>
    public void LoadChapter(string chapterId)
    {
        CurrentChapter = chapterId;
        onChapterRequested?.Invoke(chapterId);

        foreach (var c in chapters)
        {
            if (c.chapterId == chapterId && !string.IsNullOrEmpty(c.sceneName))
            {
                SceneManager.LoadScene(c.sceneName);
                return;
            }
        }
        Debug.LogWarning($"[ReactBridge] Capítulo no configurado: {chapterId}");
    }

    // ───────────── Unity → React ─────────────

    /// <summary>Vuelve al mapa web (opcionalmente filtrado por fenómeno).</summary>
    public static void OpenMap(string phenomenonId = "") => SendToReact("OpenMap", phenomenonId);

    /// <summary>Marca el capítulo como completado en la web.</summary>
    public static void ChapterCompleted(string chapterId) => SendToReact("ChapterCompleted", chapterId);

    /// <summary>Abre la guía "¿Cómo actuar?" del capítulo en la web.</summary>
    public static void OpenChapterInfo(string chapterId) => SendToReact("OpenChapterInfo", chapterId);
}

