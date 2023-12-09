#include <chrono>
#include <string>
#include <iostream>
#include <fstream>

#include <raylib.h>

int timer = 0;

void draw() {
    BeginDrawing();

    ClearBackground(RAYWHITE);

    DrawText("This is a shiga project", 800 / 2 - 170, 450 / 2 - 50, 30, BLACK);

    EndDrawing();
}

void update(double dsec) {

}

int main(void) {

    const int screenWidth = 800;
    const int screenHeight = 450;

    auto beforeframe_point = std::chrono::system_clock::now();

    InitWindow(screenWidth, screenHeight, "shiga");

    // Main game loop
    while (!WindowShouldClose())  // Detect window close button or ESC key
    {
        const double dsec = static_cast<double>(std::chrono::duration_cast<std::chrono::nanoseconds>(std::chrono::system_clock::now() - beforeframe_point).count()) / 1000000000.0;
        beforeframe_point = std::chrono::system_clock::now();
        update(dsec);
        draw();
        timer++;
    }

    CloseWindow();
}
